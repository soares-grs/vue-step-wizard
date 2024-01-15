import { filledService } from "./filled-service";

export function stepItemClass(index, selectedReference, info, stepInfos, useFieldToBeFilled, stepFilled) {
    const baseClasses = [
      useFieldToBeFilled && !filledService.isPreviousStepFilled(index, stepInfos)
        ? 'opacity-80 cursor-not-allowed'
        : 'cursor-pointer',
    ];
  
    const conditionalClasses = useFieldToBeFilled
      ? filledService.isFieldFilled(info)
        ? ['bg-green-500 text-white hover:cursor-pointer']
        : selectedReference === info.reference
          ? ['bg-[#314270] hover:bg-[#243155] hover:cursor-pointer text-white']
          : ['bg-slate-100 text-[#314270]']
      : selectedReference === info.reference
        ? ['bg-[#314270] hover:bg-[#243155] hover:cursor-pointer text-white']
        : ['bg-slate-100 text-[#314270]'];
  
    return baseClasses.concat(conditionalClasses);
  }
  
  export function stepItemTooltip(info, selectedReference, index, useFieldToBeFilled, stepFilled) {
    return useFieldToBeFilled && !filledService.isFieldFilled(info) && selectedReference !== info.reference
      ? `Preencha a etapa ${index} para liberar esta etapa`
      : info.description;
  }
  
  export function stepItemClickAction(index, useFieldToBeFilled, stepFilled, emit, stepInfos) {
    return !useFieldToBeFilled || stepFilled
      ? emit('selectStep')
      : filledService.isPreviousStepFilled(index, stepInfos) && emit('selectStep');
  }
  

export const stepItemService = { stepItemClass, stepItemTooltip, stepItemClickAction}