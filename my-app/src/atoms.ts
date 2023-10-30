import { atom, selector } from "recoil";

export const minuteState = atom({
  key: "minutes",
  default: 0,
});

// <number>처리를 하면 number만을 리턴한다.
export const hourSelector = selector<number>({
  key: "hours",
  get: ({ get }) => {
    return get(minuteState) / 60;
  },
  set: ({ set }, value) => {
    // set(변경하고싶은 state, 변경할 값);
    set(minuteState, +value * 60);
  },
});
