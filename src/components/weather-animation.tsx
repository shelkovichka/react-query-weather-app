import React from "react";
import Lottie, { LottieComponentProps } from "lottie-react";

import clearSkyAnimation from "@/assets/clear-sky.json";
import fewCloudsAnimation from "@/assets/few-clouds.json";
import scatteredCloudsAnimation from "@/assets/scattered-clouds.json";
import brokenCloudsAnimation from "@/assets/scattered-clouds.json";
import showerRainAnimation from "@/assets/rain.json";
import rainAnimation from "@/assets/rain.json";
import thunderstormAnimation from "@/assets/thunderstorm.json";
import snowAnimation from "@/assets/snow.json";
import mistAnimation from "@/assets/mist.json";

const weatherAnimations: {
  [key: string]: LottieComponentProps["animationData"];
} = {
  "01": clearSkyAnimation,
  "02": fewCloudsAnimation,
  "03": scatteredCloudsAnimation,
  "04": brokenCloudsAnimation,
  "09": showerRainAnimation,
  "10": rainAnimation,
  "11": thunderstormAnimation,
  "13": snowAnimation,
  "50": mistAnimation,
};

interface WeatherAnimationProps {
  iconCode: string;
  className?: string;
}

const WeatherAnimation: React.FC<WeatherAnimationProps> = ({
  iconCode,
  className,
}) => {
  const animationData = weatherAnimations[iconCode.slice(0, 2)];

  return (
    <Lottie animationData={animationData} loop={true} className={className} />
  );
};

export default WeatherAnimation;
