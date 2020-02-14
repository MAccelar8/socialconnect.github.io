import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { FormGroup, FormControl } from "@angular/forms";
import { LoaderService } from 'src/app/services/loader.service';
declare var $: any;

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  imgfile: File;
  constructor(private userService: UserService , private loader : LoaderService) {}
  isImageProper: boolean;
  user: any;
  userDetails: any;
  bioForm: FormGroup;
  profilePicUrl: String;
  ngOnInit() {

    this.loader.show('Profile');
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

    this.loader.hide()
  }

  openModal() {
    $("#bio-modal").modal("show");
  }

  uploadButtonClicked(event) {
    this.loader.show('upload')
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

          this.loader.hide()
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
    this.loader.show('profile change')
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
              this.loader.hide()
            }else{
              this.loader.hide()
            }
          });
        }else{
          this.loader.hide()
        }
      });

    // this.bioForm.reset();
    $("#bio-modal").modal("hide");
  }
}
