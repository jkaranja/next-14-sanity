import React from "react";

const useScrollTrigger = ({ threshold }: { threshold: number }) => {
  const [scrollTrigger, setScrollTrigger] = React.useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    scrollPosition >= threshold
      ? setScrollTrigger(true)
      : setScrollTrigger(false);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollTrigger;
};

export default useScrollTrigger;
