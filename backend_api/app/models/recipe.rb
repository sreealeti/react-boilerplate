class Recipe < ApplicationRecord
  belongs_to :user
  has_many :directions
  has_many :ingredients

  accepts_nested_attributes_for :ingredients,
    reject_if: proc { |attributes| attributes['name'].blank? },
    allow_destroy: true
  accepts_nested_attributes_for :directions,
    reject_if: proc { |attributes| attributes['step'].blank? },
    allow_destroy: true

  validates :title, :description, presence: true
  has_attached_file \
    :photo,
    styles: {
      thumb: ['100x100#', 'jpg'],
      small: ['150x150', 'jpg'],
      meduim: ['200x200', 'jpg'],
      large: ['600x600', 'jpg']
            },
    convert_options: {
      all: '-interlace Plane'
    },
    default_url: '/images/default_:style_photo.png'

  validates_attachment_presence :photo
  validates_attachment_file_name :photo, matches: [/png\Z/, /jpe?g\Z/, /gif\Z/]
  do_not_validate_attachment_file_type :photo


    def as_json(_opts = {})
    {
      id: id,
      title: title,
      description: description,
      errors: errors,
          photo_small_url: photo.url(:meduim),
          photo_lg_url: photo.url(:large),
          photo_url: photo.url,
          photo_name: photo_file_name,
    }
    end

end
