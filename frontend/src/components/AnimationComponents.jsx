import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

export const FadeInUp = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FadeInDown = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -60 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -60 }}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FadeInLeft = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -60 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FadeInRight = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 60 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScaleIn = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const RotateIn = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, rotate: -10 }}
      animate={inView ? { opacity: 1, rotate: 0 } : { opacity: 0, rotate: -10 }}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer = ({ children, className = "" }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = "" }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ParallaxSection = ({ children, speed = 0.5, className = "" }) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0,
  });

  return (
    <motion.div
      ref={ref}
      style={{
        transform: inView ? `translateY(0)` : `translateY(${speed * 100}px)`,
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const HoverScale = ({ children, scale = 1.05, className = "" }) => {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const HoverLift = ({ children, lift = 10, className = "" }) => {
  return (
    <motion.div
      whileHover={{ 
        y: -lift,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ButtonWithAnimation = ({ 
  children, 
  onClick, 
  variant = "primary", 
  className = "",
  disabled = false 
}) => {
  const baseClasses = {
    primary: "bg-primary hover:bg-orange-600 text-white",
    secondary: "bg-secondary hover:bg-blue-700 text-white",
    glass: "bg-white bg-opacity-20 backdrop-blur-lg text-white border border-white border-opacity-30 hover:bg-opacity-30",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white"
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      className={`
        px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 
        transform hover:shadow-xl shadow-lg
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${baseClasses[variant]} 
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

export const CardWithAnimation = ({ 
  children, 
  variant = "default",
  className = "",
  onClick 
}) => {
  const variants = {
    default: "bg-white rounded-3xl shadow-xl hover:shadow-2xl",
    glass: "glass rounded-3xl hover:shadow-2xl",
    gradient: "bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl hover:shadow-2xl"
  };

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className={`
        ${variants[variant]}
        p-8 transition-all duration-300 cursor-pointer
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedCounter = ({ end, duration = 2, className = "" }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let startTime;
      const startValue = 0;
      const endValue = parseInt(end);
      
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        
        setCount(Math.floor(progress * (endValue - startValue) + startValue));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [inView, end, duration]);

  return (
    <motion.div
      ref={ref}
      className={className}
    >
      {count}
    </motion.div>
  );
};

export const LoadingSpinner = ({ size = "md", className = "" }) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`
        border-4 border-primary border-opacity-20 border-t-primary rounded-full
        ${sizes[size]} ${className}
      `}
    />
  );
};

export const TextReveal = ({ text, className = "" }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const words = text.split(' ');

  return (
    <motion.div ref={ref} className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default {
  FadeInUp,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  ScaleIn,
  RotateIn,
  StaggerContainer,
  StaggerItem,
  ParallaxSection,
  HoverScale,
  HoverLift,
  ButtonWithAnimation,
  CardWithAnimation,
  AnimatedCounter,
  LoadingSpinner,
  TextReveal,
};