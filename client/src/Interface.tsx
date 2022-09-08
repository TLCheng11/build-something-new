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
    profile_img?: string | undefined;
    is_login: boolean;
  };
}
