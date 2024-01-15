const isFieldFilled = (info) => {
  return (
    info?.fieldToBeFilled &&
    info.fieldToBeFilled.length > 0 &&
    info.fieldToBeFilled.every((field) => field?.id ?? field?.length > 0)
  );
};

const isPreviousStepFilled = (index, stepInfosArray) => {
  if (index > 0) {
    const previousStep = stepInfosArray[index - 1];
    return isFieldFilled(previousStep);
  }
  return true;
};

export const filledService = { isPreviousStepFilled, isFieldFilled };
