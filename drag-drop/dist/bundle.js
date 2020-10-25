(()=>{"use strict";var e={752:(e,t,r)=>{const s=r(343),n=r(847);new s.ProjectInput,new n.ProjectList("active"),new n.ProjectList("finished")},809:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Component=void 0,t.Component=class{constructor(e,t,r,s){this.templateEl=document.getElementById(e),this.hostEl=document.getElementById(t);const n=document.importNode(this.templateEl.content,!0);this.el=n.firstElementChild,s&&(this.el.id=s),this.attach(r)}attach(e){e?this.hostEl.insertAdjacentElement("afterbegin",this.el):this.hostEl.insertAdjacentElement("beforeend",this.el)}}},343:function(e,t,r){var s=this&&this.__decorate||function(e,t,r,s){var n,i=arguments.length,o=i<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,r):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,s);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(o=(i<3?n(o):i>3?n(t,r,o):n(t,r))||o);return i>3&&o&&Object.defineProperty(t,r,o),o};Object.defineProperty(t,"__esModule",{value:!0}),t.ProjectInput=void 0;const n=r(412),i=r(497),o=r(809);class l extends o.Component{constructor(){super("project-input","app",!0,"user-input"),this.titleInputEl=this.el.querySelector("#title"),this.descriptionInputEl=this.el.querySelector("#description"),this.peopleInputEl=this.el.querySelector("#people"),this.config()}config(){this.el.addEventListener("submit",this.submitHandler)}renderContent(){}gatherUserInput(){const e=this.titleInputEl.value,t=this.descriptionInputEl.value,r=this.peopleInputEl.value;if(n.inputValidate({value:e,required:!0})&&n.inputValidate({value:t,required:!1})&&n.inputValidate({value:r,required:!0}))return[e,t,Number(r)];alert("Form is not completed")}submitHandler(e){if(e.preventDefault(),Array.isArray(this.gatherUserInput())){const[e,t,r]=this.gatherUserInput();i.projectState.addProject(e,t,r),this.clearForm()}}clearForm(){this.titleInputEl.value="",this.descriptionInputEl.value="",this.peopleInputEl.value=""}}s([n.autobind],l.prototype,"submitHandler",null),t.ProjectInput=l},424:function(e,t,r){var s=this&&this.__decorate||function(e,t,r,s){var n,i=arguments.length,o=i<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,r):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,s);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(o=(i<3?n(o):i>3?n(t,r,o):n(t,r))||o);return i>3&&o&&Object.defineProperty(t,r,o),o};Object.defineProperty(t,"__esModule",{value:!0}),t.ProjectItem=void 0;const n=r(412),i=r(809);class o extends i.Component{constructor(e,t){super("single-project",e,!1,t.id.toString()),this.project=t,this.config(),this.renderContent()}get nbOfPeople(){return 1===this.project.people?"1 person":this.project.people+" persons"}dragStartHandler(e){e.dataTransfer.setData("text/plain",this.project.id.toString()),e.dataTransfer.effectAllowed="move"}dragEndHandler(e){}config(){this.el.addEventListener("dragstart",this.dragStartHandler)}renderContent(){this.el.querySelector("h2").textContent=this.project.title,this.el.querySelector("h3").textContent=this.nbOfPeople,this.el.querySelector("p").textContent=this.project.desc}}s([n.autobind],o.prototype,"dragStartHandler",null),t.ProjectItem=o},847:function(e,t,r){var s=this&&this.__decorate||function(e,t,r,s){var n,i=arguments.length,o=i<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,r):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,s);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(o=(i<3?n(o):i>3?n(t,r,o):n(t,r))||o);return i>3&&o&&Object.defineProperty(t,r,o),o};Object.defineProperty(t,"__esModule",{value:!0}),t.ProjectList=void 0;const n=r(412),i=r(294),o=r(497),l=r(809),a=r(424);class c extends l.Component{constructor(e){super("project-list","app",!1,e+"-projects"),this.type=e,this.assignedProjects=[],this.config(),this.renderContent()}dragOverHandler(e){e.dataTransfer&&"text/plain"===e.dataTransfer.types[0]&&(e.preventDefault(),this.el.querySelector("ul").classList.add("droppable"))}dropHandler(e){const t=Number(e.dataTransfer.getData("text/plain"));isNaN(t)||o.projectState.moveProject(t,"active"===this.type?i.ProjectStatus.Active:i.ProjectStatus.Finished),this.el.querySelector("ul").classList.remove("droppable")}dragLeaveHandler(e){this.el.querySelector("ul").classList.remove("droppable")}config(){this.el.addEventListener("dragover",this.dragOverHandler),this.el.addEventListener("drop",this.dropHandler),this.el.addEventListener("dragleave",this.dragLeaveHandler),o.projectState.addListeners((e=>{this.assignedProjects=e.filter((e=>"active"===this.type?e.status===i.ProjectStatus.Active:"finished"===this.type&&e.status===i.ProjectStatus.Finished)),this.renderProjects()}))}renderContent(){const e=this.type+"-projects-list";this.el.querySelector("ul").id=e,this.el.querySelector("h2").textContent=this.type.toUpperCase()+" PROJECTS"}renderProjects(){this.el.querySelector("ul").innerHTML="";for(const e of this.assignedProjects)new a.ProjectItem(this.el.querySelector("ul").id,e)}}s([n.autobind],c.prototype,"dragOverHandler",null),s([n.autobind],c.prototype,"dropHandler",null),s([n.autobind],c.prototype,"dragLeaveHandler",null),t.ProjectList=c},412:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.inputValidate=t.autobind=void 0,t.autobind=function(e,t,r){const s=r.value;return{configurable:!0,enumerable:!1,get(){return s.bind(this)}}},t.inputValidate=function(e){let t=!0;return e.required&&(t=t&&0!==String(e.value).trim().length),t}},294:(e,t)=>{var r;Object.defineProperty(t,"__esModule",{value:!0}),t.Project=t.ProjectStatus=void 0,(r=t.ProjectStatus||(t.ProjectStatus={}))[r.Active=0]="Active",r[r.Finished=1]="Finished";class s{constructor(e,t,r,n,i=++s.projectId){this.title=e,this.desc=t,this.people=r,this.status=n,this.id=i}}t.Project=s,s.projectId=0},281:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.State=void 0,t.State=class{constructor(){this.listeners=[]}addListeners(e){this.listeners.push(e)}}},497:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.projectState=void 0;const s=r(294),n=r(281);class i extends n.State{constructor(){super(),this.projects=[]}static getInstance(){return this.instance||(this.instance=new i),this.instance}addProject(e,t,r){const n=new s.Project(e,t,r,s.ProjectStatus.Active);this.projects.push(n),this.notifyListeners()}moveProject(e,t){const r=this.projects.find((t=>t.id===e));r&&r.status!==t&&(r.status=t,this.notifyListeners())}notifyListeners(){for(let e of this.listeners)e(this.projects.slice())}}t.projectState=i.getInstance()}},t={};!function r(s){if(t[s])return t[s].exports;var n=t[s]={exports:{}};return e[s].call(n.exports,n,n.exports,r),n.exports}(752)})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kcmFnLWRyb3AvLi9zcmMvYXBwLnRzIiwid2VicGFjazovL2RyYWctZHJvcC8uL3NyYy9jb21wb25lbnRzL3Byb2plY3QvYWJzdHJhY3QtcHJvamVjdC50cyIsIndlYnBhY2s6Ly9kcmFnLWRyb3AvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0L2lucHV0LnRzIiwid2VicGFjazovL2RyYWctZHJvcC8uL3NyYy9jb21wb25lbnRzL3Byb2plY3QvaXRlbS50cyIsIndlYnBhY2s6Ly9kcmFnLWRyb3AvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0L2xpc3QudHMiLCJ3ZWJwYWNrOi8vZHJhZy1kcm9wLy4vc3JjL2RlY29yYXRvcnMvYXV0by1iaW5kLnRzIiwid2VicGFjazovL2RyYWctZHJvcC8uL3NyYy9tb2RlbHMvcHJvamVjdC50cyIsIndlYnBhY2s6Ly9kcmFnLWRyb3AvLi9zcmMvbW9kZWxzL3N0YXRlLnRzIiwid2VicGFjazovL2RyYWctZHJvcC8uL3NyYy9zdGF0ZXMvcHJvamVjdC1zdGF0ZS50cyIsIndlYnBhY2s6Ly9kcmFnLWRyb3Avd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZHJhZy1kcm9wL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6WyJQcm9qZWN0SW5wdXQiLCJQcm9qZWN0TGlzdCIsInRlbXBsYXRlSWQiLCJob3N0SWQiLCJpbnNlcnRBdFN0YXJ0IiwiZWxJZCIsInRoaXMiLCJ0ZW1wbGF0ZUVsIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImhvc3RFbCIsImltcG9ydGVkTm9kZSIsImltcG9ydE5vZGUiLCJjb250ZW50IiwiZWwiLCJmaXJzdEVsZW1lbnRDaGlsZCIsImlkIiwiYXR0YWNoIiwiaW5zZXJ0QWRqYWNlbnRFbGVtZW50IiwiQ29tcG9uZW50Iiwic3VwZXIiLCJ0aXRsZUlucHV0RWwiLCJxdWVyeVNlbGVjdG9yIiwiZGVzY3JpcHRpb25JbnB1dEVsIiwicGVvcGxlSW5wdXRFbCIsImNvbmZpZyIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdWJtaXRIYW5kbGVyIiwidGl0bGUiLCJ2YWx1ZSIsImRlc2MiLCJwZW9wbGUiLCJpbnB1dFZhbGlkYXRlIiwicmVxdWlyZWQiLCJOdW1iZXIiLCJhbGVydCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJBcnJheSIsImlzQXJyYXkiLCJnYXRoZXJVc2VySW5wdXQiLCJwcm9qZWN0U3RhdGUiLCJhZGRQcm9qZWN0IiwiY2xlYXJGb3JtIiwiYXV0b2JpbmQiLCJQcm9qZWN0SXRlbSIsInByb2plY3QiLCJ0b1N0cmluZyIsInJlbmRlckNvbnRlbnQiLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwiZWZmZWN0QWxsb3dlZCIsIl8iLCJkcmFnU3RhcnRIYW5kbGVyIiwidGV4dENvbnRlbnQiLCJuYk9mUGVvcGxlIiwidHlwZSIsImFzc2lnbmVkUHJvamVjdHMiLCJ0eXBlcyIsImNsYXNzTGlzdCIsImFkZCIsInByb2plY3RJZCIsImdldERhdGEiLCJpc05hTiIsIm1vdmVQcm9qZWN0IiwiUHJvamVjdFN0YXR1cyIsIkFjdGl2ZSIsIkZpbmlzaGVkIiwicmVtb3ZlIiwiZHJhZ092ZXJIYW5kbGVyIiwiZHJvcEhhbmRsZXIiLCJkcmFnTGVhdmVIYW5kbGVyIiwiYWRkTGlzdGVuZXJzIiwicHJvamVjdHMiLCJmaWx0ZXIiLCJzdGF0dXMiLCJyZW5kZXJQcm9qZWN0cyIsImxpc3RJZCIsInRvVXBwZXJDYXNlIiwiaW5uZXJIVE1MIiwiXzIiLCJkZXNjcmlwdG9yIiwib3JpZ2luYWxNZXRob2QiLCJjb25maWd1cmFibGUiLCJlbnVtZXJhYmxlIiwiYmluZCIsImlzVmFsaWQiLCJTdHJpbmciLCJ0cmltIiwibGVuZ3RoIiwiUHJvamVjdCIsImxpc3RlbmVycyIsImZuIiwicHVzaCIsIlByb2plY3RTdGF0ZSIsIlN0YXRlIiwiaW5zdGFuY2UiLCJudW1PZlBlb3BsZSIsIm5ld1Byb2plY3QiLCJub3RpZnlMaXN0ZW5lcnMiLCJuZXdTdGF0dXMiLCJmaW5kIiwibGlzdGVuZXJGbiIsInNsaWNlIiwiZ2V0SW5zdGFuY2UiLCJfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18iLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJleHBvcnRzIiwibW9kdWxlIiwiX193ZWJwYWNrX21vZHVsZXNfXyIsImNhbGwiXSwibWFwcGluZ3MiOiJ3Q0FBQSxlQUNBLFNBRUEsSUFBSSxFQUFBQSxhQUNKLElBQUksRUFBQUMsWUFBWSxVQUNoQixJQUFJLEVBQUFBLFlBQVksYSxnRkNMaEIsa0JBS0ksWUFDSUMsRUFDQUMsRUFDQUMsRUFDQUMsR0FFQUMsS0FBS0MsV0FBYUMsU0FBU0MsZUFBZVAsR0FDMUNJLEtBQUtJLE9BQVNGLFNBQVNDLGVBQWVOLEdBRXRDLE1BQU1RLEVBQWVILFNBQVNJLFdBQzFCTixLQUFLQyxXQUFXTSxTQUFTLEdBRTdCUCxLQUFLUSxHQUFLSCxFQUFhSSxrQkFDbkJWLElBQ0FDLEtBQUtRLEdBQUdFLEdBQUtYLEdBR2pCQyxLQUFLVyxPQUFPYixHQU1OLE9BQU9BLEdBQ1RBLEVBQ0FFLEtBQUtJLE9BQU9RLHNCQUFzQixhQUFjWixLQUFLUSxJQUVyRFIsS0FBS0ksT0FBT1Esc0JBQXNCLFlBQWFaLEtBQUtRLE8sNGJDaENoRSxlQUNBLFNBQ0EsU0FFQSxNQUFhZCxVQUFxQixFQUFBbUIsVUFLOUIsY0FDSUMsTUFBTSxnQkFBaUIsT0FBTyxFQUFNLGNBRXBDZCxLQUFLZSxhQUFlZixLQUFLUSxHQUFHUSxjQUFjLFVBQzFDaEIsS0FBS2lCLG1CQUFxQmpCLEtBQUtRLEdBQUdRLGNBQWMsZ0JBQ2hEaEIsS0FBS2tCLGNBQWdCbEIsS0FBS1EsR0FBR1EsY0FBYyxXQUMzQ2hCLEtBQUttQixTQUdULFNBQ0luQixLQUFLUSxHQUFHWSxpQkFBaUIsU0FBVXBCLEtBQUtxQixlQUc1QyxpQkFFUSxrQkFDSixNQUFNQyxFQUFRdEIsS0FBS2UsYUFBYVEsTUFDMUJDLEVBQU94QixLQUFLaUIsbUJBQW1CTSxNQUMvQkUsRUFBU3pCLEtBQUtrQixjQUFjSyxNQUVsQyxHQUNL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M0UsUUFISSxLQUFBcUQsU0FBc0IsR0FUdkIscUJBQ0gsT0FBSW5FLEtBQUswRixXQUdMMUYsS0FBSzBGLFNBQVcsSUFBSUYsR0FGYnhGLEtBQUswRixTQWFiLFdBQVdwRSxFQUFlRSxFQUFjbUUsR0FDM0MsTUFBTUMsRUFBYSxJQUFJLEVBQUFSLFFBQ25COUQsRUFDQUUsRUFDQW1FLEVBQ0EsRUFBQWhDLGNBQWNDLFFBRWxCNUQsS0FBS21FLFNBQVNvQixLQUFLSyxHQUNuQjVGLEtBQUs2RixrQkFHRixZQUFZdEMsRUFBbUJ1QyxHQUNsQyxNQUFNdEQsRUFBVXhDLEtBQUttRSxTQUFTNEIsTUFBS3ZELEdBQVdBLEVBQVE5QixLQUFPNkMsSUFFekRmLEdBQVdBLEVBQVE2QixTQUFXeUIsSUFDOUJ0RCxFQUFRNkIsT0FBU3lCLEVBQ2pCOUYsS0FBSzZGLG1CQUlMLGtCQUNKLElBQUksSUFBSUcsS0FBY2hHLEtBQUtxRixVQUN2QlcsRUFBV2hHLEtBQUttRSxTQUFTOEIsVUFLeEIsRUFBQTlELGFBQWVxRCxFQUFhVSxnQkMvQ3JDQyxFQUEyQixJQUcvQixTQUFTQyxFQUFvQkMsR0FFNUIsR0FBR0YsRUFBeUJFLEdBQzNCLE9BQU9GLEVBQXlCRSxHQUFVQyxRQUczQyxJQUFJQyxFQUFTSixFQUF5QkUsR0FBWSxDQUdqREMsUUFBUyxJQU9WLE9BSEFFLEVBQW9CSCxHQUFVSSxLQUFLRixFQUFPRCxRQUFTQyxFQUFRQSxFQUFPRCxRQUFTRixHQUdwRUcsRUFBT0QsUUNsQmZGLENBQW9CLE0iLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvamVjdElucHV0IH0gZnJvbSBcIi4vY29tcG9uZW50cy9wcm9qZWN0L2lucHV0XCI7XG5pbXBvcnQgeyBQcm9qZWN0TGlzdCB9IGZyb20gXCIuL2NvbXBvbmVudHMvcHJvamVjdC9saXN0XCI7XG5cbm5ldyBQcm9qZWN0SW5wdXQoKTtcbm5ldyBQcm9qZWN0TGlzdCgnYWN0aXZlJyk7XG5uZXcgUHJvamVjdExpc3QoJ2ZpbmlzaGVkJyk7IiwiZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbXBvbmVudDxUIGV4dGVuZHMgSFRNTEVsZW1lbnQ+IHtcbiAgICB0ZW1wbGF0ZUVsOiBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICAgIGhvc3RFbDogVDtcbiAgICBlbDogSFRNTEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgdGVtcGxhdGVJZDogc3RyaW5nLFxuICAgICAgICBob3N0SWQ6IHN0cmluZyxcbiAgICAgICAgaW5zZXJ0QXRTdGFydDogYm9vbGVhbixcbiAgICAgICAgZWxJZD86IHN0cmluZ1xuICAgICl7XG4gICAgICAgIHRoaXMudGVtcGxhdGVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRlbXBsYXRlSWQpISBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICAgICAgICB0aGlzLmhvc3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhvc3RJZCkhIGFzIFQ7XG5cbiAgICAgICAgY29uc3QgaW1wb3J0ZWROb2RlID0gZG9jdW1lbnQuaW1wb3J0Tm9kZShcbiAgICAgICAgICAgIHRoaXMudGVtcGxhdGVFbC5jb250ZW50LCB0cnVlXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZWwgPSBpbXBvcnRlZE5vZGUuZmlyc3RFbGVtZW50Q2hpbGQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIGlmIChlbElkKSB7XG4gICAgICAgICAgICB0aGlzLmVsLmlkID0gZWxJZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYXR0YWNoKGluc2VydEF0U3RhcnQpO1xuICAgIH1cblxuICAgIGFic3RyYWN0IGNvbmZpZygpOiB2b2lkO1xuICAgIGFic3RyYWN0IHJlbmRlckNvbnRlbnQoKTogdm9pZDtcblxuICAgIHByb3RlY3RlZCBhdHRhY2goaW5zZXJ0QXRTdGFydDogYm9vbGVhbikge1xuICAgICAgICBpZiAoaW5zZXJ0QXRTdGFydCkge1xuICAgICAgICAgICAgdGhpcy5ob3N0RWwuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJiZWdpblwiLCB0aGlzLmVsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaG9zdEVsLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCB0aGlzLmVsKTtcbiAgICAgICAgfVxuICAgIH1cblxufSIsImltcG9ydCB7IGF1dG9iaW5kLCBpbnB1dFZhbGlkYXRlIH0gZnJvbSBcIi4uLy4uL2RlY29yYXRvcnMvYXV0by1iaW5kXCI7XG5pbXBvcnQgeyBwcm9qZWN0U3RhdGUgfSBmcm9tIFwiLi4vLi4vc3RhdGVzL3Byb2plY3Qtc3RhdGVcIjtcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2Fic3RyYWN0LXByb2plY3RcIjtcblxuZXhwb3J0IGNsYXNzIFByb2plY3RJbnB1dCBleHRlbmRzIENvbXBvbmVudDxIVE1MRGl2RWxlbWVudD57XG4gICAgdGl0bGVJbnB1dEVsOiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGRlc2NyaXB0aW9uSW5wdXRFbDogSFRNTFRleHRBcmVhRWxlbWVudDtcbiAgICBwZW9wbGVJbnB1dEVsOiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdwcm9qZWN0LWlucHV0JywgJ2FwcCcsIHRydWUsIFwidXNlci1pbnB1dFwiKTtcblxuICAgICAgICB0aGlzLnRpdGxlSW5wdXRFbCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcihcIiN0aXRsZVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uSW5wdXRFbCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcihcIiNkZXNjcmlwdGlvblwiKSBhcyBIVE1MVGV4dEFyZWFFbGVtZW50O1xuICAgICAgICB0aGlzLnBlb3BsZUlucHV0RWwgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoXCIjcGVvcGxlXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICAgIHRoaXMuY29uZmlnKCk7XG4gICAgfVxuXG4gICAgY29uZmlnKCkge1xuICAgICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuc3VibWl0SGFuZGxlcik7XG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpIHt9XG5cbiAgICBwcml2YXRlIGdhdGhlclVzZXJJbnB1dCgpOiBbc3RyaW5nLCBzdHJpbmcsIG51bWJlcl0gfCB2b2lkIHtcbiAgICAgICAgY29uc3QgdGl0bGUgPSB0aGlzLnRpdGxlSW5wdXRFbC52YWx1ZTtcbiAgICAgICAgY29uc3QgZGVzYyA9IHRoaXMuZGVzY3JpcHRpb25JbnB1dEVsLnZhbHVlO1xuICAgICAgICBjb25zdCBwZW9wbGUgPSB0aGlzLnBlb3BsZUlucHV0RWwudmFsdWU7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgIWlucHV0VmFsaWRhdGUoe3ZhbHVlOiB0aXRsZSwgcmVxdWlyZWQ6IHRydWV9KSB8fCBcbiAgICAgICAgICAgICFpbnB1dFZhbGlkYXRlKHt2YWx1ZTogZGVzYywgcmVxdWlyZWQ6IGZhbHNlfSkgfHwgXG4gICAgICAgICAgICAhaW5wdXRWYWxpZGF0ZSh7dmFsdWU6IHBlb3BsZSwgcmVxdWlyZWQ6IHRydWV9KSkge1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdGb3JtIGlzIG5vdCBjb21wbGV0ZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBbdGl0bGUsIGRlc2MsIE51bWJlcihwZW9wbGUpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBhdXRvYmluZFxuICAgIHByaXZhdGUgc3VibWl0SGFuZGxlcihldmVudDogRXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmdhdGhlclVzZXJJbnB1dCgpKSkge1xuICAgICAgICAgICAgY29uc3QgW3RpdGxlLCBkZXNjLCBwZW9wbGVdID0gdGhpcy5nYXRoZXJVc2VySW5wdXQoKSBhcyBbc3RyaW5nLCBzdHJpbmcsIG51bWJlcl07XG4gICAgICAgICAgICBwcm9qZWN0U3RhdGUuYWRkUHJvamVjdCh0aXRsZSwgZGVzYywgcGVvcGxlKTtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJGb3JtKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBjbGVhckZvcm0oKSB7XG4gICAgICAgIHRoaXMudGl0bGVJbnB1dEVsLnZhbHVlID0gXCJcIjtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbklucHV0RWwudmFsdWUgPSBcIlwiO1xuICAgICAgICB0aGlzLnBlb3BsZUlucHV0RWwudmFsdWUgPSBcIlwiO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBhdXRvYmluZCB9IGZyb20gXCIuLi8uLi9kZWNvcmF0b3JzL2F1dG8tYmluZFwiO1xuaW1wb3J0IHsgRHJhZ2dhYmxlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9kcmFnLWRyb3BcIjtcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3Byb2plY3RcIjtcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2Fic3RyYWN0LXByb2plY3RcIjtcblxuZXhwb3J0IGNsYXNzIFByb2plY3RJdGVtIGV4dGVuZHMgQ29tcG9uZW50PEhUTUxVTGlzdEVsZW1lbnQ+IGltcGxlbWVudHMgRHJhZ2dhYmxlIHtcbiAgICBwcml2YXRlIHByb2plY3Q6IFByb2plY3Q7XG5cbiAgICBnZXQgbmJPZlBlb3BsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvamVjdC5wZW9wbGUgPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBcIjEgcGVyc29uXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0LnBlb3BsZSArIFwiIHBlcnNvbnNcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKGhvc3RJZDogc3RyaW5nLCBwcm9qZWN0OiBQcm9qZWN0KSB7XG4gICAgICAgIHN1cGVyKCdzaW5nbGUtcHJvamVjdCcsIGhvc3RJZCwgZmFsc2UsIHByb2plY3QuaWQudG9TdHJpbmcoKSk7XG4gICAgICAgIHRoaXMucHJvamVjdCA9IHByb2plY3Q7XG5cbiAgICAgICAgdGhpcy5jb25maWcoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJDb250ZW50KCk7XG4gICAgfVxuXG4gICAgQGF1dG9iaW5kXG4gICAgZHJhZ1N0YXJ0SGFuZGxlcihldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgICAgIGV2ZW50LmRhdGFUcmFuc2ZlciEuc2V0RGF0YSgndGV4dC9wbGFpbicsIHRoaXMucHJvamVjdC5pZC50b1N0cmluZygpKTtcbiAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyIS5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuICAgIH1cblxuICAgIGRyYWdFbmRIYW5kbGVyKF86IERyYWdFdmVudCkge31cblxuICAgIGNvbmZpZygpIHtcbiAgICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCB0aGlzLmRyYWdTdGFydEhhbmRsZXIpO1xuICAgIH1cblxuICAgIHJlbmRlckNvbnRlbnQoKSB7XG4gICAgICAgIHRoaXMuZWwucXVlcnlTZWxlY3RvcignaDInKSEudGV4dENvbnRlbnQgPSB0aGlzLnByb2plY3QudGl0bGU7XG4gICAgICAgIHRoaXMuZWwucXVlcnlTZWxlY3RvcignaDMnKSEudGV4dENvbnRlbnQgPSB0aGlzLm5iT2ZQZW9wbGU7XG4gICAgICAgIHRoaXMuZWwucXVlcnlTZWxlY3RvcigncCcpIS50ZXh0Q29udGVudCA9IHRoaXMucHJvamVjdC5kZXNjO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBhdXRvYmluZCB9IGZyb20gXCIuLi8uLi9kZWNvcmF0b3JzL2F1dG8tYmluZFwiO1xuaW1wb3J0IHsgRHJhZ1RhcmdldCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZHJhZy1kcm9wXCI7XG5pbXBvcnQgeyBQcm9qZWN0LCBQcm9qZWN0U3RhdHVzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9wcm9qZWN0XCI7XG5pbXBvcnQgeyBwcm9qZWN0U3RhdGUgfSBmcm9tIFwiLi4vLi4vc3RhdGVzL3Byb2plY3Qtc3RhdGVcIjtcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2Fic3RyYWN0LXByb2plY3RcIjtcbmltcG9ydCB7IFByb2plY3RJdGVtIH0gZnJvbSBcIi4vaXRlbVwiO1xuXG5leHBvcnQgY2xhc3MgUHJvamVjdExpc3QgZXh0ZW5kcyBDb21wb25lbnQ8SFRNTERpdkVsZW1lbnQ+IGltcGxlbWVudHMgRHJhZ1RhcmdldCB7XG4gICAgYXNzaWduZWRQcm9qZWN0czogUHJvamVjdFtdID0gW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHR5cGU6ICdhY3RpdmUnIHwgJ2ZpbmlzaGVkJykge1xuICAgICAgICBzdXBlcigncHJvamVjdC1saXN0JywgJ2FwcCcsIGZhbHNlLCBgJHt0eXBlfS1wcm9qZWN0c2ApO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jb25maWcoKTsgLy8gcHJvamVjdFN0YXRlIGFkZCB0aGUgbGlzdGVuZXIgb24gdGhlIFByb2plY3RMaXN0XG4gICAgICAgIHRoaXMucmVuZGVyQ29udGVudCgpO1xuICAgIH1cblxuICAgIEBhdXRvYmluZFxuICAgIGRyYWdPdmVySGFuZGxlcihldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5kYXRhVHJhbnNmZXIgJiYgZXZlbnQuZGF0YVRyYW5zZmVyLnR5cGVzWzBdID09PSAndGV4dC9wbGFpbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGxpc3RFbCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcigndWwnKSE7XG4gICAgICAgICAgICBsaXN0RWwuY2xhc3NMaXN0LmFkZCgnZHJvcHBhYmxlJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAYXV0b2JpbmRcbiAgICBkcm9wSGFuZGxlcihldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RJZCA9IE51bWJlcihldmVudC5kYXRhVHJhbnNmZXIhLmdldERhdGEoJ3RleHQvcGxhaW4nKSk7XG4gICAgICAgIGlmICghaXNOYU4ocHJvamVjdElkKSkge1xuICAgICAgICAgICAgcHJvamVjdFN0YXRlLm1vdmVQcm9qZWN0KFxuICAgICAgICAgICAgICAgIHByb2plY3RJZCwgXG4gICAgICAgICAgICAgICAgdGhpcy50eXBlID09PSBcImFjdGl2ZVwiIFxuICAgICAgICAgICAgICAgICAgICA/IFByb2plY3RTdGF0dXMuQWN0aXZlXG4gICAgICAgICAgICAgICAgICAgIDogUHJvamVjdFN0YXR1cy5GaW5pc2hlZCBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsaXN0RWwgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJ3VsJykhO1xuICAgICAgICBsaXN0RWwuY2xhc3NMaXN0LnJlbW92ZSgnZHJvcHBhYmxlJyk7XG4gICAgfVxuXG4gICAgQGF1dG9iaW5kXG4gICAgZHJhZ0xlYXZlSGFuZGxlcihfOiBEcmFnRXZlbnQpIHtcbiAgICAgICAgY29uc3QgbGlzdEVsID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCd1bCcpITtcbiAgICAgICAgbGlzdEVsLmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3BwYWJsZScpO1xuICAgIH1cblxuICAgIGNvbmZpZygpIHtcbiAgICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIHRoaXMuZHJhZ092ZXJIYW5kbGVyKTtcbiAgICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgdGhpcy5kcm9wSGFuZGxlcik7XG4gICAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgdGhpcy5kcmFnTGVhdmVIYW5kbGVyKTtcblxuICAgICAgICBwcm9qZWN0U3RhdGUuYWRkTGlzdGVuZXJzKChwcm9qZWN0czogUHJvamVjdFtdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFzc2lnbmVkUHJvamVjdHMgPSBwcm9qZWN0cy5maWx0ZXIocHJvamVjdCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gXCJhY3RpdmVcIikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvamVjdC5zdGF0dXMgPT09IFByb2plY3RTdGF0dXMuQWN0aXZlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBlID09PSBcImZpbmlzaGVkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb2plY3Quc3RhdHVzID09PSBQcm9qZWN0U3RhdHVzLkZpbmlzaGVkO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyUHJvamVjdHMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpIHtcbiAgICAgICAgY29uc3QgbGlzdElkID0gYCR7dGhpcy50eXBlfS1wcm9qZWN0cy1saXN0YDtcbiAgICAgICAgdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCd1bCcpIS5pZCA9IGxpc3RJZDtcbiAgICAgICAgdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCdoMicpIS50ZXh0Q29udGVudCA9IHRoaXMudHlwZS50b1VwcGVyQ2FzZSgpICsgJyBQUk9KRUNUUyc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXJQcm9qZWN0cygpIHtcbiAgICAgICAgY29uc3QgbGlzdEVsID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCd1bCcpITtcbiAgICAgICAgbGlzdEVsLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIGZvciAoY29uc3QgcHJvamVjdCBvZiB0aGlzLmFzc2lnbmVkUHJvamVjdHMpIHtcbiAgICAgICAgICAgIG5ldyBQcm9qZWN0SXRlbSh0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJ3VsJykhLmlkLCBwcm9qZWN0KTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJleHBvcnQgZnVuY3Rpb24gYXV0b2JpbmQoXzogYW55LCBfMjogc3RyaW5nLCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IpIHtcbiAgICBjb25zdCBvcmlnaW5hbE1ldGhvZCA9IGRlc2NyaXB0b3IudmFsdWU7XG4gICAgY29uc3QgYWRqRGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yID0ge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICBnZXQoKSB7XG4gICAgICAgIGNvbnN0IGJvdW5kRm4gPSBvcmlnaW5hbE1ldGhvZC5iaW5kKHRoaXMpO1xuICAgICAgICByZXR1cm4gYm91bmRGbjtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBhZGpEZXNjcmlwdG9yO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFZhbGlkYXRhYmxlIHtcbiAgICB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyLFxuICAgIHJlcXVpcmVkPzogYm9vbGVhbixcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlucHV0VmFsaWRhdGUoY29uZmlnOiBWYWxpZGF0YWJsZSkge1xuICAgIGxldCBpc1ZhbGlkID0gdHJ1ZTtcblxuICAgIGlmIChjb25maWcucmVxdWlyZWQpIHtcbiAgICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgU3RyaW5nKGNvbmZpZy52YWx1ZSkudHJpbSgpLmxlbmd0aCAhPT0gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gaXNWYWxpZDtcbn0iLCJleHBvcnQgZW51bSBQcm9qZWN0U3RhdHVzIHtBY3RpdmUsIEZpbmlzaGVkfVxuXG5leHBvcnQgY2xhc3MgUHJvamVjdCB7XG4gICAgc3RhdGljIHByb2plY3RJZCA9IDA7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgZGVzYzogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgcGVvcGxlOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyBzdGF0dXM6IFByb2plY3RTdGF0dXMsXG4gICAgICAgIHB1YmxpYyBpZCA9ICsrUHJvamVjdC5wcm9qZWN0SWQsXG4gICAgKXt9XG59IiwiZXhwb3J0IHR5cGUgTGlzdGVuZXJGbjxUPiA9IChwcm9qZWN0czogVFtdKSA9PiB2b2lkO1xuXG5leHBvcnQgY2xhc3MgU3RhdGU8VD4ge1xuICAgIHByb3RlY3RlZCBsaXN0ZW5lcnM6IExpc3RlbmVyRm48VD5bXSA9IFtdO1xuXG4gICAgYWRkTGlzdGVuZXJzKGZuOiBMaXN0ZW5lckZuPFQ+KSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzLnB1c2goZm4pO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBQcm9qZWN0LCBQcm9qZWN0U3RhdHVzIH0gZnJvbSBcIi4uL21vZGVscy9wcm9qZWN0XCI7XG5pbXBvcnQgeyBTdGF0ZSB9IGZyb20gXCIuLi9tb2RlbHMvc3RhdGVcIjtcblxuY2xhc3MgUHJvamVjdFN0YXRlIGV4dGVuZHMgU3RhdGU8UHJvamVjdD57XG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IFByb2plY3RTdGF0ZTtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmluc3RhbmNlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgUHJvamVjdFN0YXRlKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcHJvamVjdHM6IFByb2plY3RbXSA9IFtdO1xuXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkUHJvamVjdCh0aXRsZTogc3RyaW5nLCBkZXNjOiBzdHJpbmcsIG51bU9mUGVvcGxlOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KFxuICAgICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgICBkZXNjLFxuICAgICAgICAgICAgbnVtT2ZQZW9wbGUsXG4gICAgICAgICAgICBQcm9qZWN0U3RhdHVzLkFjdGl2ZVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XG4gICAgICAgIHRoaXMubm90aWZ5TGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG1vdmVQcm9qZWN0KHByb2plY3RJZDogbnVtYmVyLCBuZXdTdGF0dXM6IFByb2plY3RTdGF0dXMpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IHRoaXMucHJvamVjdHMuZmluZChwcm9qZWN0ID0+IHByb2plY3QuaWQgPT09IHByb2plY3RJZCk7XG4gICAgICAgIFxuICAgICAgICBpZiAocHJvamVjdCAmJiBwcm9qZWN0LnN0YXR1cyAhPT0gbmV3U3RhdHVzKSB7XG4gICAgICAgICAgICBwcm9qZWN0LnN0YXR1cyA9IG5ld1N0YXR1cztcbiAgICAgICAgICAgIHRoaXMubm90aWZ5TGlzdGVuZXJzKCk7XG4gICAgICAgIH0gXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBub3RpZnlMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGZvcihsZXQgbGlzdGVuZXJGbiBvZiB0aGlzLmxpc3RlbmVycykge1xuICAgICAgICAgICAgbGlzdGVuZXJGbih0aGlzLnByb2plY3RzLnNsaWNlKCkpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgcHJvamVjdFN0YXRlID0gUHJvamVjdFN0YXRlLmdldEluc3RhbmNlKCk7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyg3NTIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==