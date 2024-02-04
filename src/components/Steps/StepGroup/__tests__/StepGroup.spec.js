import StepGroup from "../StepGroup.vue";
import { mount, shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

const slotsMock = {
  default: () => {
    return {
      props: {
        fieldToBeFilled: "example-field",
      },
    };
  },
};

describe("StepGroup", () => {
  it("should render correct step number", async () => {
    const wrapper = mount(StepGroup, {
      slots: slotsMock,
    });

    const stepNumber = wrapper.get('[data-test="step-number"]');

    expect(stepNumber.text()).toBe('1');

  });
});
