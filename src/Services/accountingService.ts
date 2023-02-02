import axios from "axios";

import { offline } from "./settings";
import { baseAddress } from "./settings";
import {Costcode, Stage} from '../Models/costcode'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ProjectInterface } from "../Models/project";
import { Company } from "../Models/company";
import { acc } from "react-native-reanimated";
import { Alert } from "react-native";



const getProjectProfitLoss = async (companyId:string, projectId:string, accessToken: string|undefined) => {
    let result: any = {}
    // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
    if (!accessToken){ throw "AccessTokenNotFound" }
    if (offline) { return result}
    try {
      let company:Object = JSON.parse(await AsyncStorage.getItem("currentCompany") || '{}')
      let project:Object = JSON.parse(await AsyncStorage.getItem("currentProject") || '{}')
      if (companyId!=="" && projectId!==""){
        
      const response = await axios.post(
        "http://"+baseAddress+"/plugin/accounts/project_p_l/",
        {project: projectId, company: companyId },
        {
          headers: { Authorization: "Bearer " + accessToken },
        }
      )
      result = response.status === 200 ? response.data : {}
      } else throw "MISSING INFORMATION TO REQUEST DATA"
    } catch (error:any) {
        console.error("accountingAPI.getProjectProfitLoss",error)
        if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
    }
    return result
}

const appendActuals = async (
    costCodes: Costcode[], companyId:string, projectId:string, accessToken: string|undefined
) => {
  const actuals = await getProjectProfitLoss(companyId, projectId , accessToken)
  if (!(actuals.costs && actuals.income)) { return costCodes}
  for (var i = 0; i < costCodes.length; i++){
    if (costCodes[i].accountTrackingId){
      if (costCodes[i].income){
        for(var a = 0; a < actuals.income.length; a++){
          if (actuals.income[a].id === costCodes[i].accountTrackingId){
            costCodes[i].actual = actuals.income[a].costs;
            break
          }
        }
      } else{
        for(var a = 0; a < actuals.costs.length; a++){
          if (actuals.costs[a].id === costCodes[i].accountTrackingId){
            costCodes[i].actual = actuals.costs[a].costs;
            break
          }
        }
      }
    }
  }
  return costCodes
}

const appendActualsStage = async (
    stages: Stage[], companyId:string, projectId:string, accessToken: string|undefined
) => {
  
    const actuals = await getProjectProfitLoss(companyId, projectId, accessToken)
    
    if (!(actuals.costs && actuals.income)) {
        return stages
    }
else {
      stages.forEach(stage => {
        stage.actual = 0;
        stage.running = 0;
        for (let i = 0; i < stage.costCodes.length; i++) {
            if (stage.costCodes[i].accountTrackingId) {
                if (stage.costCodes[i].income) {
                    for (let a = 0; a < actuals.income.length; a++) {
                        if (actuals.income[a].id === stage.costCodes[i].accountTrackingId) {
                            stage.costCodes[i].actual = actuals.income[a].costs;
                            break
                        }
                    }
                } else {
                    for (let a = 0; a < actuals.costs.length; a++) {
                        if (actuals.costs[a].id === stage.costCodes[i].accountTrackingId) {
                            stage.costCodes[i].actual = actuals.costs[a].costs;
                            stage.actual +=  actuals.costs[a].costs;
                            if (stage.costCodes[i].completed) stage.running += actuals.costs[a].costs
                            // else if (stage.costCodes[i].orders) stage.running += Math.max(actuals.costs[a].costs, parseFloat(stage.costCodes[i].orders), parseFloat(stage.costCodes[i].budget))
                            else stage.running += Math.max(actuals.costs[a].costs, parseFloat(stage.costCodes[i].budget));
                            break;
                        }
                    }
                }
            }
        }
    })

    }
    
    return stages
}

const accountingService = {
    getProjectProfitLoss,
    appendActuals,
    appendActualsStage
}

export default accountingService