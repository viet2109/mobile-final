import { FC } from "react";

export interface ScreenStackConfigs {
    name: string,
    component: FC<any>
}

export type RootStackParamList = {
    Home: undefined;
    Details: undefined;
};