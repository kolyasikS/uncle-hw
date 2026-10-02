export type TurnSlide = {
  from: number;
  to: number;
  resetOnLand?: boolean;
};

export type SlideProps = {
  data: AdminSignUpData;
  update: <K extends keyof AdminSignUpData>(
    field: K,
    value: AdminSignUpData[K],
  ) => void;
  goTo: (page: number) => void;
  restart: () => void;
};

export type AdminSignUpData = {
  email: string;
  password: string;
  code: string;
};
