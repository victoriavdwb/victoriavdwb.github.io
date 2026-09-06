import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/content";
import { Hero } from "@/components/Hero";
import { BodyStage } from "@/components/stage/BodyStage";
import { Ch1Hemodynamics } from "@/components/chapters/Ch1Hemodynamics";
import { Ch2Placenta } from "@/components/chapters/Ch2Placenta";
import { Ch3Endothelium } from "@/components/chapters/Ch3Endothelium";
import { Ch4Heart } from "@/components/chapters/Ch4Heart";
import { Ch5DualHit } from "@/components/chapters/Ch5DualHit";
import { Faq } from "@/components/Faq";
import { Closing } from "@/components/Closing";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <Hero dict={dict} />
      <BodyStage dict={dict} />
      <Ch1Hemodynamics dict={dict} />
      <Ch2Placenta dict={dict} />
      <Ch3Endothelium dict={dict} />
      <Ch4Heart dict={dict} />
      <Ch5DualHit dict={dict} />
      <Faq dict={dict} />
      <Closing dict={dict} />
    </>
  );
}
