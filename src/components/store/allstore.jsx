import { data } from "autoprefixer";
import { create } from "zustand";

export const alldata = create((set) => ({
  cvdata: [],
  select: [],
  addToCvData: (data) => {
    set((state) => {
      return {
        cvdata: data,
      };
    });
  },
  updateObject: (data, i, name) => {
 
    set((state) => {
      let test = { ...state };
   
      test["cvdata"][i][name] = data;
      return {
        ...test,
      };
    });
  },
  updateArray: (data, i, name) => {
    set((state) => {
      let test = { ...state };
      test["cvdata"][i][name].push(data);
      return {
        ...test,
      };
    });
  },
  dataUpdateArray: (data, i, name,ind) => {
    set((state) => {
      let test = { ...state };
      test["cvdata"][i][name][ind]=data;
      return {
        ...test,
      };
    });
  },
  deleteArray: ( i, name,ind) => {
    set((state) => {
      let test = { ...state };
      test["cvdata"][i][name].splice(ind,1);
      return {
        ...test,
      };
    });
  },
  addToSelect: (data) => {
    set((state) => {
      return {
        select: data,
      };
    });
  },
  setEducation: (data) => {
    set((state) => {
      state["education"].push(data);

      return {
        select: [...state],
      };
    });
  },
}));
