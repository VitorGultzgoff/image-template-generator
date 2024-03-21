// Libs
import React, { createContext, useState, useContext, useMemo } from "react";

export interface IStepsContextData {
  activeStep: number;
  setActiveStep: (step: number) => void;
}

// Context
const StepsContext = createContext<IStepsContextData>({} as IStepsContextData);

interface UseStepsProviderProps {
  children?: React.ReactNode;
}

// Provider
const UseStepsProvider: React.FC<UseStepsProviderProps> = ({ children }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const value = useMemo(
    () => ({
      activeStep,
      setActiveStep,
    }),
    [activeStep, setActiveStep]
  );

  return (
    <StepsContext.Provider value={value}>{children}</StepsContext.Provider>
  );
};

// Hook
function useSteps(): IStepsContextData {
  // Get data from context
  const context = useContext(StepsContext);

  // If user is not using context provider (DEV purposes only)
  if (!context)
    throw new Error("useSteps must be used within a UseStepsProvider");

  return context;
}

export { UseStepsProvider, useSteps };
