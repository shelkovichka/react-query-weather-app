import React from "react";
import Lottie from "lottie-react";
import clearSkyAnimation from "@/animations/clear-sky.json";
import fewCloudsAnimation from "@/animations/few-clouds.json";
import scatteredCloudsAnimation from "@/animations/scattered-clouds.json";
import brokenCloudsAnimation from "@/animations/scattered-clouds.json";
import showerRainAnimation from "@/animations/rain.json";
import rainAnimation from "@/animations/rain.json";
import thunderstormAnimation from "@/animations/thunderstorm.json";
import snowAnimation from "@/animations/snow.json";
import mistAnimation from "@/animations/mist.json";

const weatherAnimations: { [key: string]: any } = {
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
