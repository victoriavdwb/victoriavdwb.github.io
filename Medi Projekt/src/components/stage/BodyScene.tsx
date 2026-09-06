"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils.js";
import { useSimulation } from "@/lib/state";

type Hotspot = { id: string; title: string; text: string };

const NORMAL = "#0d9488";
const PE = "#e11d48";

/* ------------------------------------------------------------------ */
/* Weiblicher Glaskörper (echtes Mensch-Mesh, Hologramm-Look)          */
/* ------------------------------------------------------------------ */

// Beim Deployment in einem Unterordner (GitHub Pages) muss der Asset-Pfad das Prefix tragen.
const BODY_MODEL = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/models/female-base.glb`;
useGLTF.preload(BODY_MODEL);

// Weibliche, schwangere Figur über die Morph-Regler des Basismodells
const BODY_MORPHS: Record<string, number> = {
  bodyFeminine: 1,
  bustBigger: 0.25,
  waistNarrower: 0.25,
  hipsWider: 0.3,
  bellyBigger: 1,
};

function findBone(root: THREE.Object3D, suffix: string): THREE.Object3D | null {
  let found: THREE.Object3D | null = null;
  root.traverse((obj) => {
    if (!found && obj.name.endsWith(suffix)) found = obj;
  });
  return found;
}

// Richtet einen Knochen so aus, dass das Kind in eine Welt-Richtung zeigt.
function aimBoneAlong(bone: THREE.Object3D, child: THREE.Object3D, worldDir: THREE.Vector3) {
  bone.updateWorldMatrix(true, false);
  const localDir = child.position.clone().normalize();
  const currentWorld = localDir.applyQuaternion(bone.getWorldQuaternion(new THREE.Quaternion())).normalize();
  const align = new THREE.Quaternion().setFromUnitVectors(currentWorld, worldDir.clone().normalize());
  const worldQuat = bone.getWorldQuaternion(new THREE.Quaternion()).premultiply(align);
  const parentQuat = new THREE.Quaternion();
  bone.parent?.getWorldQuaternion(parentQuat);
  bone.quaternion.copy(parentQuat.invert().multiply(worldQuat));
  bone.updateWorldMatrix(true, false);
}

// Anatomische Neutralhaltung: Arme hängen, leicht abduziert, Ellbogen gestreckt.
function poseAnatomicalArms(root: THREE.Object3D) {
  const abduct = THREE.MathUtils.degToRad(18);
  const leftDir = new THREE.Vector3(Math.sin(abduct), -Math.cos(abduct), 0);
  const rightDir = new THREE.Vector3(-Math.sin(abduct), -Math.cos(abduct), 0);

  const leftArm = findBone(root, "LeftArm");
  const leftFore = findBone(root, "LeftForeArm");
  const leftHand = findBone(root, "LeftHand");
  if (leftArm && leftFore) aimBoneAlong(leftArm, leftFore, leftDir);
  if (leftFore && leftHand) aimBoneAlong(leftFore, leftHand, leftDir);

  const rightArm = findBone(root, "RightArm");
  const rightFore = findBone(root, "RightForeArm");
  const rightHand = findBone(root, "RightHand");
  if (rightArm && rightFore) aimBoneAlong(rightArm, rightFore, rightDir);
  if (rightFore && rightHand) aimBoneAlong(rightFore, rightHand, rightDir);
}

// Klont das Modell, posiert die Arme und überschreibt alle Materialien.
function useBodyClone(material: THREE.Material) {
  const { scene } = useGLTF(BODY_MODEL);

  return useMemo(() => {
    const root = cloneSkeleton(scene);
    root.updateMatrixWorld(true);
    poseAnatomicalArms(root);
    root.updateMatrixWorld(true);
    root.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      // Nur der Körper wird gebraucht, keine Augen/Zähne/Zunge
      if (/Eyes|Teeth|Tongue/.test(mesh.name)) {
        mesh.visible = false;
        return;
      }
      mesh.material = material;
      mesh.frustumCulled = false;
      mesh.castShadow = false;
      mesh.receiveShadow = false;
      if (mesh.morphTargetDictionary && mesh.morphTargetInfluences) {
        for (const [name, value] of Object.entries(BODY_MORPHS)) {
          const index = mesh.morphTargetDictionary[name];
          if (index !== undefined) mesh.morphTargetInfluences[index] = value;
        }
      }
    });
    return root;
  }, [scene, material]);
}

function GlassBody({ isPe, tint }: { isPe: boolean; tint: string }) {
  const glass = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#a8d4ff",
        transparent: true,
        opacity: 0.16,
        roughness: 0.08,
        metalness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0.2,
        depthWrite: false,
      }),
    [],
  );

  // Feines Drahtgitter für den Hologramm-Look der Vorlage
  const wire = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#6ab7ff",
        wireframe: true,
        transparent: true,
        opacity: 0.05,
        depthWrite: false,
      }),
    [],
  );

  const solid = useBodyClone(glass);
  const wireframe = useBodyClone(wire);

  // Modell auf die Szenengröße normalisieren: Füße bei y=-1.8, Höhe ~3.9
  const { scale, offset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(solid);
    const height = box.max.y - box.min.y;
    const s = 3.9 / height;
    const center = box.getCenter(new THREE.Vector3());
    return {
      scale: s,
      offset: new THREE.Vector3(-center.x * s, -1.8 - box.min.y * s, -center.z * s),
    };
  }, [solid]);

  return (
    <group>
      <group position={offset} scale={scale}>
        <primitive object={solid}>
          <ArterialTree skeleton={solid} isPe={isPe} tint={tint} />
        </primitive>
        <primitive object={wireframe} />
      </group>
      {/* Schwangerschaftsbauch, unterhalb des Herzens */}
      <mesh position={[0, 0.32, 0.16]} scale={[0.82, 0.95, 0.78]} material={glass}>
        <sphereGeometry args={[0.34, 28, 22]} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Arterienbaum entlang der Knochen, innerhalb der Körpersilhouette    */
/* ------------------------------------------------------------------ */

type VesselSeg = {
  key: string;
  curve: THREE.CatmullRomCurve3;
  radius: number;
  flow?: boolean;
  flowOffset?: number;
};

function lerpPt(a: THREE.Vector3, b: THREE.Vector3, t: number) {
  return a.clone().lerp(b, t);
}

function boneLocal(skeleton: THREE.Object3D, suffix: string): THREE.Vector3 | null {
  const bone = findBone(skeleton, suffix);
  if (!bone) return null;
  const p = new THREE.Vector3();
  bone.getWorldPosition(p);
  skeleton.worldToLocal(p);
  return p;
}

function shaftLocal(skeleton: THREE.Object3D, suffix: string): THREE.Vector3 | null {
  const bone = findBone(skeleton, suffix);
  if (!bone) return boneLocal(skeleton, suffix);
  const child = bone.children.find((c) => c.name.startsWith("mixamorig:")) ?? bone.children[0];
  if (!child) return boneLocal(skeleton, suffix);
  const p = child.position.clone().multiplyScalar(0.5);
  bone.localToWorld(p);
  skeleton.worldToLocal(p);
  return p;
}

function ArterialTree({
  skeleton,
  isPe,
  tint,
}: {
  skeleton: THREE.Object3D;
  isPe: boolean;
  tint: string;
}) {
  const segments = useMemo(() => {
    skeleton.updateMatrixWorld(true);

    const p = (suffix: string) => boneLocal(skeleton, suffix);
    const mid = (suffix: string) => shaftLocal(skeleton, suffix);

    const hips = p("Hips");
    const neck = p("Neck");
    const spine = p("Spine");
    const spine1 = p("Spine1");
    const spine2 = p("Spine2");
    if (!hips) return [] as VesselSeg[];

    // Mittelebene des Rumpfes – wie in der Vorlage liegen alle Gefäße INNEN, nicht davor.
    const torsoZ =
      [hips, neck, spine, spine1, spine2].filter((pt): pt is THREE.Vector3 => pt !== null).reduce((s, pt) => s + pt.z, 0) /
        Math.max(1, [hips, neck, spine, spine1, spine2].filter(Boolean).length);

    const embed = (pt: THREE.Vector3 | null) => {
      if (!pt) return null;
      pt.z = THREE.MathUtils.lerp(pt.z, torsoZ, 0.85);
      return pt;
    };

    const segs: VesselSeg[] = [];
    const add = (key: string, pts: Array<THREE.Vector3 | null>, radius: number, flow = false, flowOffset = 0) => {
      const clean = pts.filter((pt): pt is THREE.Vector3 => pt !== null).map((pt) => embed(pt.clone())!);
      if (clean.length < 2) return;
      const dense: THREE.Vector3[] = [];
      for (let i = 0; i < clean.length - 1; i += 1) {
        for (let s = 0; s < 8; s += 1) dense.push(lerpPt(clean[i], clean[i + 1], s / 8));
      }
      dense.push(clean[clean.length - 1]);
      segs.push({
        key,
        curve: new THREE.CatmullRomCurve3(dense, false, "centripetal"),
        radius,
        flow,
        flowOffset,
      });
    };

    const k = isPe ? 0.72 : 1;
    const rTrunk = 0.011 * k;
    const rLarge = 0.007 * k;
    const rMid = 0.005 * k;
    const rSmall = 0.0038 * k;

    const head = p("Head");
    const lShoulder = p("LeftShoulder");
    const rShoulder = p("RightShoulder");

    const dropY = -0.03;
    const down = (pt: THREE.Vector3 | null) => {
      if (!pt) return null;
      return pt.clone().add(new THREE.Vector3(0, dropY, 0));
    };

    // Absteigende Aorta nur nach unten – kein Zwischenpunkt Richtung Hals (sonst Knick über dem Herzen).
    add("aorta", [spine2, spine1, spine, hips], rTrunk, true);
    if (neck && spine2) {
      add("aortaArch", [spine2, lerpPt(spine2, neck, 0.5), neck], rTrunk, true);
    }

    if (neck && head) {
      add("carotidL", [neck, lerpPt(neck, lShoulder ?? neck, 0.15), lerpPt(head, lShoulder ?? head, 0.08)], rLarge);
      add("carotidR", [neck, lerpPt(neck, rShoulder ?? neck, 0.15), lerpPt(head, rShoulder ?? head, 0.08)], rLarge);
    }

    add("renalL", [spine, lerpPt(spine ?? hips, p("LeftUpLeg") ?? hips, 0.2)], rSmall);
    add("renalR", [spine, lerpPt(spine ?? hips, p("RightUpLeg") ?? hips, 0.2)], rSmall);

    // Bis zum Schultergelenk (Arm-Bone) – Ober- und Unterarm bleiben frei.
    const shoulderVessel = (side: "Left" | "Right", flowOffset: number) => {
      const prefix = side === "Left" ? "l" : "r";
      const shoulder = p(`${side}Shoulder`);
      const joint = p(`${side}Arm`);
      if (!shoulder) return;
      const shoulderLow = down(shoulder)!;
      const jointLow = joint ? down(joint)! : null;
      const subStart = down(lerpPt(neck ?? shoulder, shoulder, 0.45))!;
      add(`${prefix}link`, [spine2 ?? subStart, subStart], rMid);
      add(`${prefix}subclavian`, [subStart, shoulderLow, jointLow], rMid, true, flowOffset);
    };

    shoulderVessel("Left", 0.2);
    shoulderVessel("Right", 0.35);

    const leg = (side: "Left" | "Right", flowOffset: number) => {
      const prefix = side === "Left" ? "l" : "r";
      const hip = p(`${side}UpLeg`);
      const knee = p(`${side}Leg`);
      const ankle = p(`${side}Foot`);
      const toe = p(`${side}ToeBase`);
      if (!hip || !knee || !ankle) return;
      add(`${prefix}iliac`, [hips, lerpPt(hips, hip, 0.5), hip], rLarge);
      add(`${prefix}femoral`, [hip, mid(`${side}UpLeg`), knee], rMid, true, flowOffset);
      add(`${prefix}tib`, [knee, mid(`${side}Leg`), ankle], rSmall);
      if (toe) add(`${prefix}dorsalis`, [ankle, lerpPt(ankle, toe, 0.5), toe], rSmall);
    };

    leg("Left", 0.5);
    leg("Right", 0.7);
    return segs;
  }, [skeleton, isPe]);

  return (
    <group>
      {segments.map((seg) => (
        <group key={seg.key}>
          <mesh>
            <tubeGeometry args={[seg.curve, 24, seg.radius, 6, false]} />
            <PulsingVesselMaterial tint={tint} isPe={isPe} flow={!!seg.flow} />
          </mesh>
          {seg.flow && (
            <FlowParticles curve={seg.curve} isPe={isPe} tint={tint} offset={seg.flowOffset ?? 0} />
          )}
        </group>
      ))}
    </group>
  );
}

function PulsingVesselMaterial({
  tint,
  isPe,
  flow,
}: {
  tint: string;
  isPe: boolean;
  flow: boolean;
}) {
  const ref = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const beat = Math.pow(Math.max(0, Math.sin(clock.getElapsedTime() * (isPe ? 5.4 : 4.0))), isPe ? 5 : 10);
    if (isPe) {
      ref.current.emissiveIntensity = 0.12 + beat * 0.95;
      ref.current.opacity = 0.72 + beat * 0.22;
    } else if (flow) {
      ref.current.emissiveIntensity = 0.38 + beat * 0.22;
      ref.current.opacity = 0.88;
    }
  });

  return (
    <meshStandardMaterial
      ref={ref}
      color={tint}
      emissive={tint}
      emissiveIntensity={0.4}
      roughness={0.45}
      transparent
      opacity={0.88}
    />
  );
}

function FlowParticles({
  curve,
  isPe,
  tint,
  offset = 0,
}: {
  curve: THREE.CatmullRomCurve3;
  isPe: boolean;
  tint: string;
  offset?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const count = isPe ? 6 : 10;
  const lookTarget = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const time = clock.getElapsedTime();
    const rate = isPe ? 5.4 : 4.0;
    const beat = Math.pow(Math.max(0, Math.sin(time * rate)), isPe ? 5 : 10);
    const speed = isPe ? 0.05 + beat * 0.32 : 0.26 + beat * 0.08;

    group.current.children.forEach((child, index) => {
      let u = (time * speed + index / count + offset) % 1;
      if (isPe) u = (u + 0.12 * Math.sin(time * 8 + index * 2.1) * beat) % 1;
      const t = Math.min(0.999, Math.max(0.001, u < 0 ? u + 1 : u));
      const point = curve.getPointAt(t);
      const tangent = curve.getTangentAt(t);
      child.position.copy(point);
      lookTarget.copy(point).add(tangent);
      child.lookAt(lookTarget);
      const pulse = isPe ? 0.4 + beat * 0.85 : 0.92 + beat * 0.14;
      child.scale.set(pulse, pulse, pulse * (isPe ? 1.3 + beat * 0.8 : 2.0));
      const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      if (mat) mat.opacity = isPe ? 0.2 + beat * 0.75 : 0.72 + beat * 0.2;
    });
  });

  return (
    <group ref={group}>
      {Array.from({ length: count }).map((_, index) => (
        <mesh key={index}>
          <sphereGeometry args={[0.0042, 8, 8]} />
          <meshBasicMaterial color={tint} transparent opacity={0.85} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Anatomisches Herz mit Vorhöfen, Kammern und großen Gefäßen          */
/* ------------------------------------------------------------------ */

const MYOCARD = "#d23a47";
const MYOCARD_LIGHT = "#e06471";
const ATRIUM = "#d9505e";
const ARTERIAL = "#cf3f52";
const VENOUS = "#4f9fdc";
const VENOUS_DARK = "#3d7fd1";

function AnatomicalHeart({ isPe }: { isPe: boolean }) {
  const ventricles = useRef<THREE.Group>(null);
  const atria = useRef<THREE.Group>(null);

  const vessels = useMemo(() => {
    const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
    const curve = (...pts: THREE.Vector3[]) => new THREE.CatmullRomCurve3(pts);
    return {
      // Aorta: ascendens mittig, Bogen zur linken Körperseite, descendens dahinter
      aorta: curve(v(0.0, 0.1, 0.0), v(0.02, 0.28, -0.01), v(0.09, 0.36, -0.04), v(0.14, 0.2, -0.07), v(0.13, 0.02, -0.08)),
      // Drei Abgänge am Aortenbogen (Truncus brachiocephalicus, A. carotis, A. subclavia)
      branch1: curve(v(0.02, 0.32, -0.02), v(0.0, 0.44, -0.02)),
      branch2: curve(v(0.06, 0.35, -0.03), v(0.06, 0.46, -0.03)),
      branch3: curve(v(0.1, 0.33, -0.05), v(0.13, 0.44, -0.05)),
      // Truncus pulmonalis: kreuzt vor der Aorta, teilt sich in re./li. Lungenarterie
      pulmonal: curve(v(-0.05, 0.05, 0.07), v(-0.02, 0.18, 0.08), v(0.03, 0.26, 0.04)),
      pulmonalL: curve(v(0.03, 0.26, 0.04), v(0.11, 0.26, -0.01), v(0.17, 0.23, -0.03)),
      pulmonalR: curve(v(0.03, 0.26, 0.04), v(-0.05, 0.27, 0.0), v(-0.13, 0.25, -0.02)),
      // Obere und untere Hohlvene, münden in den rechten Vorhof
      cavaSup: curve(v(-0.13, 0.38, 0.0), v(-0.13, 0.24, 0.01), v(-0.12, 0.12, 0.02)),
      cavaInf: curve(v(-0.11, 0.04, 0.02), v(-0.1, -0.12, 0.01), v(-0.1, -0.24, 0.0)),
      // Lungenvenen: münden paarig in den linken Vorhof
      pulmVeinL1: curve(v(0.21, 0.16, -0.06), v(0.13, 0.14, -0.05)),
      pulmVeinL2: curve(v(0.2, 0.08, -0.07), v(0.13, 0.09, -0.06)),
      pulmVeinR1: curve(v(-0.02, 0.17, -0.1), v(0.05, 0.14, -0.07)),
      pulmVeinR2: curve(v(-0.01, 0.09, -0.11), v(0.05, 0.09, -0.08)),
    };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const rate = isPe ? 5.4 : 4.0;
    const amplitude = isPe ? 0.11 : 0.055;
    const ventricleBeat = Math.pow(Math.max(0, Math.sin(t * rate)), isPe ? 5 : 10);
    const atriumBeat = Math.pow(Math.max(0, Math.sin(t * rate + 0.9)), isPe ? 5 : 10);
    ventricles.current?.scale.setScalar(1 - ventricleBeat * amplitude);
    atria.current?.scale.setScalar(1 - atriumBeat * amplitude * 0.8);
  });

  const tube = (
    curve: THREE.CatmullRomCurve3,
    radius: number,
    color: string,
    key: string,
  ) => (
    <mesh key={key}>
      <tubeGeometry args={[curve, 28, radius, 12, false]} />
      <meshStandardMaterial color={color} roughness={0.38} emissive={color} emissiveIntensity={0.14} />
    </mesh>
  );

  // Herzspitze zeigt nach links-unten (aus Patientinnensicht), leicht nach vorn.
  return (
    <group position={[0.03, 0.93, 0.16]} rotation={[0.12, 0, 0.38]} scale={0.48}>
      <group ref={ventricles}>
        {/* Linke Kammer: kräftige, kegelförmige Muskelmasse bis zur Herzspitze */}
        <mesh position={[0.05, -0.07, 0]} scale={isPe ? [0.98, 1.12, 0.92] : [0.86, 1.14, 0.86]}>
          <sphereGeometry args={[0.155, 24, 20]} />
          <meshStandardMaterial color={MYOCARD} roughness={0.35} emissive={MYOCARD} emissiveIntensity={0.18} />
        </mesh>
        {/* Rechte Kammer: flacher, legt sich vorn um die linke Kammer */}
        <mesh position={[-0.08, -0.03, 0.05]} scale={[0.95, 1, 0.8]} rotation={[0, 0, 0.2]}>
          <sphereGeometry args={[0.125, 22, 18]} />
          <meshStandardMaterial color={MYOCARD_LIGHT} roughness={0.4} emissive={MYOCARD_LIGHT} emissiveIntensity={0.14} />
        </mesh>
        {/* Sulcus interventricularis (angedeutete Kranzarterie) */}
        <mesh position={[-0.015, -0.06, 0.11]} rotation={[0.25, 0, -0.35]}>
          <capsuleGeometry args={[0.008, 0.16, 3, 8]} />
          <meshStandardMaterial color="#8f2434" roughness={0.5} />
        </mesh>
      </group>

      <group ref={atria}>
        {/* Linker Vorhof (hinten oben, nimmt die Lungenvenen auf) */}
        <mesh position={[0.09, 0.12, -0.05]} scale={[1, 0.85, 0.9]}>
          <sphereGeometry args={[0.085, 20, 16]} />
          <meshStandardMaterial color={ATRIUM} roughness={0.42} emissive={ATRIUM} emissiveIntensity={0.12} />
        </mesh>
        {/* Rechter Vorhof (nimmt die Hohlvenen auf) */}
        <mesh position={[-0.11, 0.09, 0.02]} scale={[1.05, 0.9, 0.95]}>
          <sphereGeometry args={[0.09, 20, 16]} />
          <meshStandardMaterial color={ATRIUM} roughness={0.42} emissive={ATRIUM} emissiveIntensity={0.1} />
        </mesh>
      </group>

      {/* Arterieller Stamm (rot) */}
      {tube(vessels.aorta, 0.042, ARTERIAL, "aorta")}
      {tube(vessels.branch1, 0.017, ARTERIAL, "branch1")}
      {tube(vessels.branch2, 0.015, ARTERIAL, "branch2")}
      {tube(vessels.branch3, 0.016, ARTERIAL, "branch3")}

      {/* Lungenkreislauf: Truncus pulmonalis + Aufzweigung (blau) */}
      {tube(vessels.pulmonal, 0.036, VENOUS, "pulmonal")}
      {tube(vessels.pulmonalL, 0.026, VENOUS, "pulmonalL")}
      {tube(vessels.pulmonalR, 0.026, VENOUS, "pulmonalR")}

      {/* Hohlvenen (dunkelblau) */}
      {tube(vessels.cavaSup, 0.032, VENOUS_DARK, "cavaSup")}
      {tube(vessels.cavaInf, 0.034, VENOUS_DARK, "cavaInf")}

      {/* Lungenvenen (rot, paarig in den linken Vorhof) */}
      {tube(vessels.pulmVeinL1, 0.014, ARTERIAL, "pulmVeinL1")}
      {tube(vessels.pulmVeinL2, 0.014, ARTERIAL, "pulmVeinL2")}
      {tube(vessels.pulmVeinR1, 0.014, ARTERIAL, "pulmVeinR1")}
      {tube(vessels.pulmVeinR2, 0.014, ARTERIAL, "pulmVeinR2")}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Uterus mit Plazenta, Nabelschnur und Fötus in Fetalhaltung          */
/* ------------------------------------------------------------------ */

const SKIN = "#f0c3ad";
const PLACENTA = "#a83a4e";
const CORD = "#e0a7b6";

function Fetus() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.position.y = Math.sin(t * 0.9) * 0.012;
    group.current.rotation.z = Math.sin(t * 0.6) * 0.04;
  });

  const skin = useMemo(
    () => new THREE.MeshStandardMaterial({ color: SKIN, roughness: 0.55 }),
    [],
  );

  return (
    // Kopf unten (Schädellage), Rücken zur Uteruswand gekrümmt
    <group ref={group} position={[0.01, -0.05, 0.04]} rotation={[0, 0.35, 0]}>
      {/* Kopf */}
      <mesh position={[0, -0.15, 0.03]} scale={[0.95, 1.05, 0.98]} material={skin}>
        <sphereGeometry args={[0.085, 22, 18]} />
      </mesh>
      {/* Rumpf, nach hinten eingerollt */}
      <mesh position={[0.01, -0.03, -0.02]} rotation={[-0.5, 0, 0.12]} material={skin}>
        <capsuleGeometry args={[0.052, 0.13, 6, 14]} />
      </mesh>
      {/* Gesäß */}
      <mesh position={[0.02, 0.07, -0.06]} material={skin}>
        <sphereGeometry args={[0.06, 18, 14]} />
      </mesh>
      {/* Beine, zum Bauch angezogen */}
      <mesh position={[0.05, 0.05, 0.0]} rotation={[1.25, 0, -0.25]} material={skin}>
        <capsuleGeometry args={[0.027, 0.09, 4, 10]} />
      </mesh>
      <mesh position={[0.04, -0.02, 0.06]} rotation={[2.3, 0, -0.15]} material={skin}>
        <capsuleGeometry args={[0.021, 0.08, 4, 10]} />
      </mesh>
      <mesh position={[-0.02, 0.05, 0.01]} rotation={[1.35, 0, 0.2]} material={skin}>
        <capsuleGeometry args={[0.027, 0.09, 4, 10]} />
      </mesh>
      <mesh position={[-0.02, -0.02, 0.07]} rotation={[2.35, 0, 0.1]} material={skin}>
        <capsuleGeometry args={[0.021, 0.08, 4, 10]} />
      </mesh>
      {/* Arme, vor der Brust verschränkt */}
      <mesh position={[0.06, -0.09, 0.04]} rotation={[0.6, 0, 1.15]} material={skin}>
        <capsuleGeometry args={[0.019, 0.075, 4, 10]} />
      </mesh>
      <mesh position={[-0.045, -0.09, 0.05]} rotation={[0.7, 0, -1.05]} material={skin}>
        <capsuleGeometry args={[0.019, 0.075, 4, 10]} />
      </mesh>
    </group>
  );
}

function Womb({ isPe, tint }: { isPe: boolean; tint: string }) {
  const cordCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0.16, -0.13),
        new THREE.Vector3(0.09, 0.08, 0.0),
        new THREE.Vector3(0.03, 0.02, 0.09),
        new THREE.Vector3(-0.05, -0.03, 0.04),
        new THREE.Vector3(0.0, -0.07, 0.03),
      ]),
    [],
  );

  // Kotyledonen: knotige Läppchen auf der fetalen Seite der Plazenta
  const cotyledons = useMemo(() => {
    const items: Array<{ position: [number, number, number]; scale: number }> = [];
    const r = 0.245;
    for (let i = 0; i < 9; i += 1) {
      const angle = (i / 9) * Math.PI * 2;
      const spread = 0.32 + (i % 3) * 0.1;
      const dir = new THREE.Vector3(
        Math.sin(spread) * Math.cos(angle),
        Math.cos(spread),
        Math.sin(spread) * Math.sin(angle),
      );
      dir.applyEuler(new THREE.Euler(-0.75, 0, 0));
      items.push({
        position: [dir.x * r, dir.y * r, dir.z * r],
        scale: 0.8 + (i % 4) * 0.12,
      });
    }
    return items;
  }, []);

  return (
    <group position={[0, 0.38, 0.2]} scale={0.72}>
      {/* Uteruswand */}
      <mesh scale={[1, 1.08, 0.92]}>
        <sphereGeometry args={[0.31, 28, 24]} />
        <meshStandardMaterial
          color="#d38ba8"
          transparent
          opacity={0.22}
          emissive={tint}
          emissiveIntensity={0.12}
          roughness={0.4}
          depthWrite={false}
        />
      </mesh>
      {/* Fruchtwasser */}
      <mesh scale={[1, 1.08, 0.92]}>
        <sphereGeometry args={[0.275, 24, 20]} />
        <meshStandardMaterial
          color="#bcd9e8"
          transparent
          opacity={0.08}
          roughness={0.2}
          depthWrite={false}
        />
      </mesh>

      {/* Plazenta: Kalotte an der hinteren, oberen Uteruswand */}
      <mesh rotation={[-0.75, 0, 0]} scale={[1, 1.05, 1]}>
        <sphereGeometry args={[0.285, 26, 14, 0, Math.PI * 2, 0, Math.PI / 3]} />
        <meshStandardMaterial
          color={PLACENTA}
          emissive={PLACENTA}
          emissiveIntensity={isPe ? 0.55 : 0.25}
          roughness={0.55}
          side={THREE.DoubleSide}
        />
      </mesh>
      {cotyledons.map((c, index) => (
        <mesh key={index} position={c.position} scale={c.scale}>
          <sphereGeometry args={[0.032, 12, 10]} />
          <meshStandardMaterial
            color="#93293e"
            emissive="#93293e"
            emissiveIntensity={isPe ? 0.45 : 0.2}
            roughness={0.6}
          />
        </mesh>
      ))}

      {/* Nabelschnur von der Plazenta zum Nabel des Fötus */}
      <mesh>
        <tubeGeometry args={[cordCurve, 40, 0.016, 8, false]} />
        <meshStandardMaterial color={CORD} roughness={0.45} />
      </mesh>

      <Fetus />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Marker + Szene                                                      */
/* ------------------------------------------------------------------ */

function Marker({
  position,
  label,
  onSelect,
  tint,
}: {
  position: [number, number, number];
  label: string;
  onSelect: () => void;
  tint: string;
}) {
  return (
    <Html position={position} center distanceFactor={7} zIndexRange={[20, 0]}>
      <button
        type="button"
        onClick={onSelect}
        className="group flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-surface/95 py-1 pl-1 pr-3 text-[11px] font-semibold text-ink shadow-[0_6px_20px_-8px_rgb(11_18_32/0.4)] backdrop-blur transition-transform hover:-translate-y-0.5"
      >
        <span
          className="flex size-4 items-center justify-center rounded-full"
          style={{ backgroundColor: tint }}
        >
          <span className="size-1.5 rounded-full bg-white" />
        </span>
        {label}
      </button>
    </Html>
  );
}

function Scene({ hotspots, onSelect }: { hotspots: Hotspot[]; onSelect: (id: string) => void }) {
  const { isPe } = useSimulation();
  const tint = isPe ? PE : NORMAL;
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.18) * 0.22;
  });

  const byId = (id: string) => hotspots.find((hotspot) => hotspot.id === id);

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 5, 4]} intensity={1.5} />
      <directionalLight position={[-4, 1, -3]} intensity={0.5} color={tint} />
      <pointLight position={[0, 0.4, 2.4]} intensity={0.7} distance={8} />

      <group ref={group} position={[0, -0.15, 0]}>
        <Suspense fallback={null}>
          <GlassBody isPe={isPe} tint={tint} />
        </Suspense>
        <AnatomicalHeart isPe={isPe} />
        <Womb isPe={isPe} tint={tint} />

        <Marker
          position={[-0.62, 1.02, 0.3]}
          label={byId("herz")?.title ?? "Herz"}
          onSelect={() => onSelect("herz")}
          tint={tint}
        />
        <Marker
          position={[-0.5, -0.82, 0.3]}
          label={byId("endothel")?.title ?? "Gefäße"}
          onSelect={() => onSelect("endothel")}
          tint={tint}
        />
        <Marker
          position={[1.28, 0.22, 0.35]}
          label={byId("plazenta")?.title ?? "Plazenta"}
          onSelect={() => onSelect("plazenta")}
          tint={tint}
        />
      </group>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2.9}
        maxPolarAngle={Math.PI / 1.75}
        minAzimuthAngle={-0.7}
        maxAzimuthAngle={0.7}
      />
    </>
  );
}

export default function BodyScene({
  hotspots,
  onSelect,
}: {
  hotspots: Hotspot[];
  onSelect: (id: string) => void;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 5.4], fov: 34 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ touchAction: "pan-y" }}
    >
      <Scene hotspots={hotspots} onSelect={onSelect} />
    </Canvas>
  );
}
