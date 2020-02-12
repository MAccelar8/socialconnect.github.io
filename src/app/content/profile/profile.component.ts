import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { FormGroup, FormControl } from "@angular/forms";
declare var $: any;

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  imgfile: File;
  constructor(private userService: UserService) {}
  isImageProper: boolean;
  user: any;
  userDetails: any;
  bioForm: FormGroup;
  profilePicUrl: String;
  ngOnInit() {
    console.log("localstorage");
    // localStorage.removeItem('profileurl')
    console.log(localStorage.getItem("profileurl"));
    this.isImageProper = false;
    this.user = JSON.parse(localStorage.getItem("user"));

    this.userService.getUserDetails().subscribe((res: any) => {
      // console.log(res.message);
      if (res.status) {
        // console.log(JSON.parse(localStorage.getItem("user")))
        this.userDetails = res.message;
        console.log(this.userDetails);
        this.bioForm.patchValue({
          address: this.userDetails.address,
          city: this.userDetails.city,
          birthdate: this.userDetails.birthdate,
          contact: this.userDetails.contactno,
          gender: this.userDetails.gender
        });

        console.log(this.userDetails.profilePicURL);
        if (this.userDetails.profilePicURL == null) {
          this.profilePicUrl = this.user.photoURL;
        } else {
          this.profilePicUrl = this.userDetails.profilePicURL;
        }
      }
    });
    this.bioForm = new FormGroup({
      address: new FormControl(),
      city: new FormControl(),
      birthdate: new FormControl(),
      contact: new FormControl(),
      gender: new FormControl()
    });
  }

  openModal() {
    $("#bio-modal").modal("show");
  }

  uploadButtonClicked(event) {
    console.log(this.user);
    this.userService.uploadimage(this.imgfile, this.user.uid).then(data => {
      console.log("url is");
      console.log(data);
      console.log("after upload image");
      data.subscribe(mess => {
        // console.log(localStorage.getItem("profileurl"));
        this.userService.setPhotoUrl(mess).subscribe((res: any) => {
          console.log(
            "setPhotourl subscribed with URL: " + res.message.profilePicURL
          );
          this.profilePicUrl = res.message.profilePicURL;
          // localStorage.removeItem("profileurl");
        });
      });
    });

    // console.log("button click data")
    // console.log(data);
  }

  Imageupload(event) {
    console.log(event.target.files);
    this.imgfile = event.target.files[0];
    if (this.imgfile.type == "image/png" || this.imgfile.type == "image/jpeg") {
      this.isImageProper = true;
    } else {
      console.log("select a image file");
    }
  }

  onbioformSubmitted() {
    console.log(this.bioForm.value);
    this.userService
      .setUserDetails(this.bioForm.value)
      .subscribe((res: any) => {
        if (res.status) {
          console.log("post successfull");

          this.userService.getUserDetails().subscribe((res: any) => {
            console.log(res.message);
            if (res.status) {
              // console.log(JSON.parse(localStorage.getItem("user")))
              this.userDetails = res.message;
            }
          });
        }
      });

    // this.bioForm.reset();
    $("#bio-modal").modal("hide");
  }
}
