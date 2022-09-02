export interface ICurrentUser {
  id?: number | undefined;
  email?: string | undefined;
  username?: string | undefined;
  first_name?: string | undefined;
  last_name?: string | undefined;
  dob?: Date | undefined;
  profile_img?: string | undefined;
  introduction?: string | undefined;
  is_login?: boolean | undefined;
}

export interface ModelGroupProps {
  id: number;
  group_name: string;
  xposition?: number | undefined;
  yposition?: number | undefined;
  zposition?: number | undefined;
  xrotation?: number | undefined;
  yrotation?: number | undefined;
  zrotation?: number | undefined;
  model_planes?: [ModelPlaneProps] | undefined;
  model_boxes?: [ModelBoxProps] | undefined;
  model_spheres?: [ModelSphereProps] | undefined;
}

export interface ModelPlaneProps {
  id: number;
  width?: number | undefined;
  depth?: number | undefined;
  xposition?: number | undefined;
  yposition?: number | undefined;
  zposition?: number | undefined;
  xrotation?: number | undefined;
  yrotation?: number | undefined;
  zrotation?: number | undefined;
  color?: string | undefined;
  image_url?: string | undefined;
  mass?: number | undefined;
  group: {
    id: number;
    group_name: string;
  };
}

export interface ModelBoxProps {
  id: number;
  width?: number | undefined;
  height?: number | undefined;
  depth?: number | undefined;
  xposition?: number | undefined;
  yposition?: number | undefined;
  zposition?: number | undefined;
  xrotation?: number | undefined;
  yrotation?: number | undefined;
  zrotation?: number | undefined;
  color?: string | undefined;
  image_url?: string | undefined;
  mass?: number | undefined;
  group: {
    id: number;
    group_name: string;
  };
}

export interface ModelSphereProps {
  id: number;
  radius?: number | undefined;
  width_segments?: number | undefined;
  height_segments?: number | undefined;
  xposition?: number | undefined;
  yposition?: number | undefined;
  zposition?: number | undefined;
  xrotation?: number | undefined;
  yrotation?: number | undefined;
  zrotation?: number | undefined;
  color?: string | undefined;
  image_url?: string | undefined;
  mass?: number | undefined;
  group: {
    id: number;
    group_name: string;
  };
}
