import axios from "axios";
import { config } from "./config";

const BaseUrl = config.BaseUrl+"/api/auth/"

// const BaseUrl = "https://esara.herokuapp.com/api/app/";



function sendSms(phone){
    
    return axios.post(BaseUrl+"send-signup-token",{phone});
}

function verifyToken(data){
    
    return axios.post(BaseUrl+"verify-signup-token",data);
}


function signUp(){
    return axios.post(BaseUrl+"signup")
}

function login(data){
    return axios.post(BaseUrl+"login",data)
}

function createAccount(data){
    return axios.post(BaseUrl+"signup",data)
    
}

function forgotPasswordCode(data){
    return axios.post(BaseUrl+"forgot-password",data);
}

function resetPassword(data){
    return axios.post(BaseUrl+"update-password",data);
    
}


export default {
   sendSms,
   verifyToken,
   signUp,
   login,
   createAccount,
   forgotPasswordCode,
   resetPassword
}


// Route.group(() => {
//     Route.post("signup", "UserController.signup");
//     Route.put("signup/:id", "UserController.update");
//     Route.post("login", "UserController.login");
//     Route.post("forgot-password", "UserController.forgotPassword");
//     Route.post("update-password-token", "UserController.updatePasswordByToken");
//     Route.post("update-password", "UserController.updatePassword");
//     Route.post("update-profile", "UserController.updateProfile");
//   }).prefix("api/auth");
  


// const Route = use("Route");

// Route.group(() => {
//   /**AUTH */
//   Route.post("login", "UserController.login");              DONE
//   Route.post("signup", "UserController.signup");                       done
//   Route.put("signup/:id", "UserController.update");              done
//   Route.post("forgot-password", "UserController.forgotPassword");   done
//   Route.post("update-password-token", "UserController.updatePasswordByToken");   done
//   Route.post("update-password", "UserController.updatePassword");  done

//   Route.get("send_sms/:phone", "SmsMessageController.sendSMS");  done
//   Route.post("verify_token", "SMSPinController.verifyToken");  done

//   /**Web App */
//   Route.get("taskcategories", "TaskCategoryController.index");           DONE
//   Route.get("tasks", "TaskController.index");                            DONE
//   Route.get("tasks/:id", "TaskController.show");
//   Route.get("users/summary/:id", "UserController.getTaskSummary");    done
//   Route.get("invoices", "InvoiceController.getUserInvoices").middleware([
//     "auth",
//   ]);

//   Route.get("users", "UserController.getWorkers");  done
//   Route.get("companies", "UserController.getCompanies");  done
//   Route.get("users/:id", "UserController.showUser");   
//   Route.get("companies/:id", "UserController.showCompany");
//   Route.get("paymentprofiles", "PaymentProfileController.index");
//   Route.get("users/find/:query", "UserController.filterUsers");
//   Route.get("education/:id", "UserEducationController.show");

//   Route.get("tos", "SettingsController.getTOS");
//   Route.get("privacy-policy", "SettingsController.getPrivacyPolicy");
//   Route.get("faqs", "FaqController.index");
//   Route.post("enquiries", "EnquiryController.store");

//   /**Dashboard */

//   //summary page
//   Route.get("summary", "UserController.getSummary").middleware(["auth"]);                DONE
//   //notifications
//   Route.get(
//     "notifications/user",
//     "NotificationController.getNoticeByUser"
//   ).middleware(["auth"]);

//   Route.put("notifications/:id", "NotificationController.update").middleware([
//     "auth",
//   ]);

//   //User Documents
//   Route.get(
//     "/userdocuments",
//     "UserDocumentController.getDocumentOfUser"
//   ).middleware(["auth"]);

//   Route.get(
//     "userdocuments/user/:id",
//     "UserDocumentController.getDocumentByUser"
//   ).middleware(["auth"]);

//   Route.post("userdocuments", "UserDocumentController.store").middleware([
//     "auth",
//   ]);

//   //Tasks

//   Route.get("tasks/users/posted", "TaskController.userTasks").middleware([
//     "auth",
//   ]);

//   Route.post("tasks", "TaskController.store").middleware(["auth"]);
//   Route.put("tasks/:id", "TaskController.update").middleware(["auth"]);

//   //Works

//   Route.get("tasks/users/done", "TaskController.doneTasks").middleware([
//     "auth",
//   ]);

//   Route.get(
//     "taskprogress/task/:id",
//     "TaskProgressController.getProgressByTask"
//   ).middleware(["auth"]);
//   Route.post("taskprogress", "TaskProgressController.store").middleware([
//     "auth",
//   ]);

//   //Bids

//   Route.post("bids", "BidController.store").middleware(["auth"]);

//   Route.get("bids/task/:id", "BidController.getByTask");

//   Route.post("assign-worker", "TaskController.assignWorker").middleware([
//     "auth",
//   ]);

//   //Logs
//   Route.get("logs", "UserLogController.getLogsByUser").middleware(["auth"]);
//   Route.get(
//     "logs/:fromdate/:todate/:userid",
//     "UserLogController.getUserLogs"
//   ).middleware(["auth"]);

//   //Disciplinary Actions
//   Route.get(
//     "discipline",
//     "DisciplinaryActionController.getUserDisciplinaryAction"
//   ).middleware(["auth"]);

//   //Ratings

//   Route.get("ratings", "RatingController.getRatingByUser").middleware(["auth"]);

//   //Profile

//   Route.get("profile", "UserController.getProfile").middleware(["auth"]);
//   Route.put("update-profile/:id", "UserController.updateProfile").middleware([
//     "auth",
//   ]);
// }).prefix("api/app");

  
