# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_09_13_012056) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "comments", force: :cascade do |t|
    t.bigint "project_id", null: false
    t.bigint "user_id", null: false
    t.string "title"
    t.string "comment"
    t.float "rating"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_comments_on_project_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "model_boxes", force: :cascade do |t|
    t.bigint "model_group_id", null: false
    t.float "width", default: 1.0
    t.float "height", default: 1.0
    t.float "depth", default: 1.0
    t.float "xposition", default: 0.0
    t.float "yposition", default: 4.0
    t.float "zposition", default: 0.0
    t.float "xrotation", default: 0.0
    t.float "yrotation", default: 0.0
    t.float "zrotation", default: 0.0
    t.string "color"
    t.string "image_url"
    t.float "mass", default: 1.0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["model_group_id"], name: "index_model_boxes_on_model_group_id"
  end

  create_table "model_cylinders", force: :cascade do |t|
    t.bigint "model_group_id", null: false
    t.float "radius_top", default: 0.5
    t.float "radius_bottom", default: 0.5
    t.float "height", default: 1.0
    t.float "segments", default: 3.0
    t.float "theta_length", default: 360.0
    t.boolean "open_ended", default: false
    t.float "xposition", default: 0.0
    t.float "yposition", default: 4.0
    t.float "zposition", default: 0.0
    t.float "xrotation", default: 0.0
    t.float "yrotation", default: 0.0
    t.float "zrotation", default: 0.0
    t.string "color"
    t.string "image_url"
    t.float "mass", default: 1.0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["model_group_id"], name: "index_model_cylinders_on_model_group_id"
  end

  create_table "model_groups", force: :cascade do |t|
    t.bigint "project_id", null: false
    t.string "group_name", default: "New Group"
    t.integer "parent_group_id"
    t.float "xposition", default: 0.0
    t.float "yposition", default: 0.0
    t.float "zposition", default: 0.0
    t.float "xrotation", default: 0.0
    t.float "yrotation", default: 0.0
    t.float "zrotation", default: 0.0
    t.float "mass", default: 0.0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_model_groups_on_project_id"
  end

  create_table "model_planes", force: :cascade do |t|
    t.bigint "model_group_id", null: false
    t.float "width", default: 5.0
    t.float "depth", default: 5.0
    t.float "xposition", default: 0.0
    t.float "yposition", default: 1.0
    t.float "zposition", default: 0.0
    t.float "xrotation", default: 0.0
    t.float "yrotation", default: 0.0
    t.float "zrotation", default: 0.0
    t.string "color"
    t.string "image_url"
    t.float "mass", default: 0.0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["model_group_id"], name: "index_model_planes_on_model_group_id"
  end

  create_table "model_shapes", force: :cascade do |t|
    t.bigint "model_group_id", null: false
    t.float "radius", default: 0.5
    t.float "segments", default: 32.0
    t.float "theta_length", default: 360.0
    t.float "xposition", default: 0.0
    t.float "yposition", default: 4.0
    t.float "zposition", default: 0.0
    t.float "xrotation", default: 0.0
    t.float "yrotation", default: 0.0
    t.float "zrotation", default: 0.0
    t.string "color"
    t.string "image_url"
    t.float "mass", default: 1.0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["model_group_id"], name: "index_model_shapes_on_model_group_id"
  end

  create_table "model_spheres", force: :cascade do |t|
    t.bigint "model_group_id", null: false
    t.float "radius", default: 0.5
    t.float "width_segments", default: 32.0
    t.float "height_segments", default: 16.0
    t.float "phi_length", default: 360.0
    t.float "theta_length", default: 360.0
    t.float "xposition", default: 0.0
    t.float "yposition", default: 4.0
    t.float "zposition", default: 0.0
    t.float "xrotation", default: 0.0
    t.float "yrotation", default: 0.0
    t.float "zrotation", default: 0.0
    t.string "color"
    t.string "image_url"
    t.float "mass", default: 1.0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["model_group_id"], name: "index_model_spheres_on_model_group_id"
  end

  create_table "project_settings", force: :cascade do |t|
    t.bigint "project_id", null: false
    t.float "xcamera", default: 5.0
    t.float "ycamera", default: 5.0
    t.float "zcamera", default: 5.0
    t.string "bg_color", default: "#9CA3AF"
    t.boolean "shadow", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_project_settings_on_project_id"
  end

  create_table "projects", force: :cascade do |t|
    t.integer "created_by"
    t.string "title"
    t.string "tags"
    t.string "description"
    t.boolean "on_market", default: false
    t.float "price"
    t.integer "sold_count"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_projects", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "project_id", null: false
    t.boolean "favored", default: false
    t.boolean "allow_edit", default: false
    t.boolean "purchased", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_user_projects_on_project_id"
    t.index ["user_id"], name: "index_user_projects_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "username"
    t.string "password_digest"
    t.string "first_name"
    t.string "last_name"
    t.datetime "dob"
    t.string "profile_img"
    t.text "svg"
    t.string "introduction"
    t.boolean "is_login", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "comments", "projects"
  add_foreign_key "comments", "users"
  add_foreign_key "model_boxes", "model_groups"
  add_foreign_key "model_cylinders", "model_groups"
  add_foreign_key "model_groups", "projects"
  add_foreign_key "model_planes", "model_groups"
  add_foreign_key "model_shapes", "model_groups"
  add_foreign_key "model_spheres", "model_groups"
  add_foreign_key "project_settings", "projects"
  add_foreign_key "user_projects", "projects"
  add_foreign_key "user_projects", "users"
end
