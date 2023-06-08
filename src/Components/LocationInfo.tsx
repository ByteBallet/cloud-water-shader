export const cloudLocation = [
    {
      position: [60, 30, 45],
      mx: 1,
      mz: 1,
    },
    {
      position: [60, -30, 45],
      mx: 1,
      mz: -1,
    },
    {
      position: [-60, 30, 45],
      mx: -1,
      mz: 1,
    },
    {
      position: [-60, -30, 45],
      mx: -1,
      mz: -1,
    },
    {
      position: [60, 0, 45],
      mx: 1,
      mz: 0,
    },
    {
      position: [0, -30, 45],
      mx: 0,
      mz: -1,
    },
    {
      position: [-60, 0, 45],
      mx: -1,
      mz: 0,
    },
    {
      position: [0, 30, 45],
      mx: 0,
      mz: 1,
    },
];

export const backCloudPosition = [
  {
    position: [190, -40, 1],
    initialPos: [220, -20, 1],
    opacity: 0.4,
    scale: [7, 6, 1],
  },
  {
    position: [100, 50, 1],
    initialPos: [220, -20, 1],
    opacity: 0.4,
    scale: [6, 6, 1],
  },
  {
    position: [0, -130, 1],
    initialPos: [-20, -150, 1],
    opacity: 0.4,
    scale: [6, 6, 1],
  },
  {
    position: [-80, -50, 1],
    initialPos: [-20, -150, 1],
    opacity: 0.4,
    scale: [6, 6, 1],
  },
];

export const fixedClouds = [
  {
    position: [-140, -100, 2],
    opacity: 0.6,
    scale:[10, 8, 1],
  },
  {
    position: [-140, 80, 2],
    opacity: 0.8,
    scale:[6, 4, 1],
  },
  {
    position: [160, 90, 2],
    opacity: 0.6,
    scale:[8, 6, 1],
  },
  {
    position: [80, -30, 2],
    opacity: 0.8,
    scale:[6, 4, 1],
  },
];

export const meshBlockLocation = [
    {
      id: 1,
      name: "flavor",
      position: [140, 123, 1],
      area: [25, 25],
      size: [75, 11],
      flag: [-1, -1],
    },
    {
      id: 2,
      name: "mountain",
      position: [191, 170, 1],
      area: [28, 28],
      size: [74, 10],
      flag: [-1, -1],
    },
    {
      id: 3,
      name: "harbor",
      position: [225, 200, 1],
      area: [30, 17],
      size: [68, 9],
      flag: [1, 1],
    },
    {
      id: 4,
      name: "metatropolis",
      position: [205, 117, 1],
      area: [40, 40],
      size: [85, 9],
      flag: [1, -1],
    },
    {
      id: 5,
      name: "dome",
      position: [170, 83, 1],
      area: [32, 22],
      size: [40, 29],
      flag: [-1, -1],
    },
    {
      id: 6,
      name: "marketplace",
      position: [212, 40, 1],
      area: [15, 13],
      size: [72, 23],
      flag: [1, 1],
    },
];

export const planeLocation = {
    x: -100,
    y: 25,
    z: 5,
};

export const planeShadowLocation = {
    x: -110,
    y: 15,
    z: 2,
};