export const itemEnterVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
};

export const itemHoverVariants = {
  hover: { boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)', transition: { duration: 0.15 } },
};

export const draggedItemVariants = {
  dragging: { boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)', zIndex: 100 },
};