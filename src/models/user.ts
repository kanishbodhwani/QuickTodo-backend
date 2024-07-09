export class User {
  uid: string;
  username: string;
  snapchat_details: SnapchatDetails;
  phone_number: string;
  bio: string;
  display_picture: string;
  gender: string;
  dob: string;
  deleted: boolean;
  location: Location;
  access_token: string;
  created_at: number;
  updated_at: number;

  constructor(
    uid: string,
    username: string,
    snapchat_details: SnapchatDetails,
    phone_number: string,
    bio: string,
    display_picture: string,
    gender: string,
    dob: string,
    deleted: boolean,
    location: Location,
    access_token: string,
    created_at: number,
    updated_at: number
  ) {
    (this.uid = uid),
      (this.username = username),
      (this.snapchat_details = snapchat_details),
      (this.phone_number = phone_number),
      (this.bio = bio),
      (this.display_picture = display_picture),
      (this.gender = gender),
      (this.dob = dob),
      (this.deleted = deleted),
      (this.location = location),
      (this.access_token = access_token),
      (this.created_at = created_at),
      (this.updated_at = updated_at);
  }
}

class Location {
  geo_hash: string;
  latitude: number;
  longitude: number;

  constructor(geo_hash: string, latitude: number, longitude: number) {
    (this.geo_hash = geo_hash),
      (this.latitude = latitude),
      (this.longitude = longitude);
  }
}

class SnapchatDetails {
  display_name: string;
  bitmoji: string;
  access_token: string;

  constructor(display_name: string, bitmoji: string, access_token: string) {
    (this.display_name = display_name),
      (this.bitmoji = bitmoji),
      (this.access_token = access_token);
  }
}
