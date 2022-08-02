import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  
  departmentCreationForm !: FormGroup;

  constructor(private api: ApiService, private formBuilder:FormBuilder, public global:GlobalService) { }

  showMe:boolean = false;
  isTrue:boolean = true;

  
  ngOnInit(): void {
    // let adminDeptId:Number = 1;
     this.getDesignation();
    // this.getDepartment(1);
    this.getAdminDepartment(1);
    // all department
    this.getAllDepartment();
    // bfc division name
    this.getExpenditureDivison();
    // all major heads
    this.getMajorHead();

    this.departmentCreationForm = this.formBuilder.group({
      departmentName : [''],
      adminDepartment: [''],
      designationOfHod: [''],
      divisionType:[''],
      bcoStatus:[''],
      bcoName:[''],
      budgetHead:[''],
      docDescription:[''],
      uploadDocument:[''],
      remarks:['']
    })

  }
  isDisplay:boolean = true;
  showDetails(){
    this.showMe = !this.showMe;
  }
// =========================== department details ================================================
// get designation
  designation: string[] = [];
  getDesignation(){
    this.api.getDesignation().subscribe({
      next:(res)=>{
        // console.table(res);
        let data = JSON.stringify(res);
        let data1 = JSON.parse(data);
        let length = data1.length;

        for(let desgVal= 0; desgVal < length ; desgVal++){
          this.designation.push(data1[desgVal].desgDescEn);
        }
      },
      error:()=>{
        alert("error while fatching data");
      }
    })
  }

  // getting admin department
  getAdminDepartment(adminDeptId:number){
    this.api.getAdminDepartment(adminDeptId).subscribe({
      next:(res)=>{
        let receivedRes = JSON.stringify(res);
        let receivedRes1 = JSON.parse(receivedRes);
        // alert(receivedRes1[0]);
        this.departmentCreationForm.controls['adminDepartment'].setValue(receivedRes1[0].adminNameEn);
      },
      error:()=>{
        alert("error while fatching admin. department");
      }
    });
  }

  // get department on behald of id
  /*getDepartment(adminDeptId:number){
    // alert(adminDeptId);
    this.api.getDepartment(adminDeptId).subscribe({
      next:(res)=>{
        let data = JSON.stringify(res);
        let data1 = JSON.parse(data);
        alert(data1[0].deptNameEn);
        this.departmentCreationForm.controls['departmentName'].setValue(data1[0].deptNameEn);
      },
      error:()=>{
        alert("error while fatching department");
      }
    })
  }*/

  // get all department
  getAllDepartment(){
    this.api.getAllDepart().subscribe({
      next:(res)=>{
        // console.table(res);
      },
      error:()=>{
        alert("error while fetching all departments");
      }
    })
  }


  // get expenditure division
  bfcDivName:string[] = [];
  getExpenditureDivison(){
    this.api.getExpenditureDivision().subscribe({
      next:(res)=>{
        // console.table(res);
        let data = JSON.stringify(res);
        let data1 = JSON.parse(data);
        let length = data1.length;
        // alert(length);
        for(let bfcDivName = 0 ; bfcDivName < length ; bfcDivName++ ){
           this.bfcDivName.push(data1[bfcDivName].bfcDivisionNameEn);
        }
        // alert(this.bfcDivName);
      },
      error:()=>{
        alert("error while fetching expenditure division");
      }
    })
  }
// =========================== department details ================================================

// =========================== bco details =============================


majorHead:string[] = [];
getMajorHead(){
  this.api.getMajorHead().subscribe({
    next:(res)=>{
      // console.table(res);
      let data = JSON.stringify(res);
      let data1 = JSON.parse(data);
      let length = data1.length;

      for(let majorHead = 0 ; majorHead <length ; majorHead++){
        this.majorHead.push(data1[majorHead].majorHeadCode);
      }


    },
    error:()=>{
      alert("error while fetching major head data");
    }
  })
}




isActive:boolean = true;
activateNewBco(){
  // let value = this.departmentCreationForm.controls['bcoStatus'].value;
  this.isActive = false;
}
isSubMajAvail:boolean = false;
getSubMajorHead(event:number){
  let length = `${event}`.length;
  if(length == 4){
    this.api.getSubMajorHead(event).subscribe({
      next:(res)=>{
        console.table(res);
        this.isSubMajAvail = true;
      },
      error:()=>{
        alert("invalid budget head code");
      }
      
    })
  }
}

isMinorHead:boolean = false;
getMinorHead(event:number){
  let length = `${event}`.length;
  if(length == 2){
    alert(event);
    this.isMinorHead = !this.isMinorHead;
  }
  
}
// =========================== bco details =============================

}
