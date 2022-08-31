export interface ModelGroupProps {
  id?: number | undefined;
  group_name?: string | undefined;
  xposition?: number | undefined;
  yposition?: number | undefined;
  zposition?: number | undefined;
  xrotation?: number | undefined;
  yrotation?: number | undefined;
  zrotation?: number | undefined;
  model_planes?: [ModelPlaneProps] | undefined;
  model_boxed?: [ModelBoxProps] | undefined;
  model_sphere?: [ModelSphereProps] | undefined;
}

export interface ModelPlaneProps {
  id?: number | undefined;
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
}

export interface ModelBoxProps {
  id?: number | undefined;
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
}

export interface ModelSphereProps {
  id?: number | undefined;
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
}
