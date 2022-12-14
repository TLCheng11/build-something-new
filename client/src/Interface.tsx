export interface ICurrentUser {
  id?: number | undefined;
  email?: string | undefined;
  username?: string | undefined;
  first_name?: string | undefined;
  last_name?: string | undefined;
  dob?: Date | undefined;
  // profile_img?: string | undefined;
  image_url?: string | undefined;
  introduction?: string | undefined;
  is_login?: boolean | undefined;
}

export interface IProject {
  id: number;
  title: string;
  created_by?: number | undefined;
  creator?: string | undefined;
  tags?: string | undefined;
  description?: string | undefined;
  favored?: boolean | undefined;
  on_market: boolean;
  price?: number | undefined;
  sold_count?: number | undefined;
  overall_rating?: number | undefined;
  rating_count?: number | undefined;
  model_groups: IModelGroup[];
  project_setting?: ISetting;
}

export interface ISetting {
  xcamera: number;
  ycamera: number;
  zcamera: number;
  bg_color: string;
  shadow: boolean;
}

export interface IModelGroup {
  id: number;
  group_name: string;
  parent_group_id?: number | undefined;
  parent_group_name?: string | undefined;
  xposition?: number | undefined;
  yposition?: number | undefined;
  zposition?: number | undefined;
  xrotation?: number | undefined;
  yrotation?: number | undefined;
  zrotation?: number | undefined;
  model_planes?: IModelPlane[] | undefined;
  model_boxes?: IModelBox[] | undefined;
  model_spheres?: IModelSphere[] | undefined;
  model_shapes?: IModelShape[] | undefined;
  model_cylinders?: IModelCylinder[] | undefined;
  child_groups?: IModelGroup[] | undefined;
}

export interface IModelPlane {
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

export interface IModelShape {
  id: number;
  radius?: number | undefined;
  segments?: number | undefined;
  theta_length?: number | undefined;
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

export interface IModelBox {
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

export interface IModelSphere {
  id: number;
  radius?: number | undefined;
  width_segments?: number | undefined;
  height_segments?: number | undefined;
  phi_length?: number | undefined;
  theta_length?: number | undefined;
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

export interface IModelCylinder {
  id: number;
  radius_top?: number | undefined;
  radius_bottom?: number | undefined;
  height?: number | undefined;
  segments?: number | undefined;
  theta_length?: number | undefined;
  open_ended?: boolean | undefined;
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

export interface IComment {
  id: number;
  rating: number;
  title: string;
  comment?: string | undefined;
  updated_at: string;
  user: {
    id: number;
    username: string;
    image_url?: string | undefined;
    is_login: boolean;
  };
}
