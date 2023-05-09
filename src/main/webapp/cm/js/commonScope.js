var com = {};

// =============================================================================
/**
 * 통신 함수(submission 또는 ajax 통신)를 작성한다.
 *
 * @namespace com.sbm
 * @memberOf com
 * @author Inswave Systems
 */
// =============================================================================

com.sbm = {};

/**
 * 서버 통신 확장 모듈, Submission를 실행합니다.
 *
 * @memberOf com.sbm
 * @function com.sbm.execute
 * @date 2017.11.30
 * @param {Object} sbmObj submission 객체
 * @param {Object} requestData [Default : null, JSON, XML] 요청 데이터로 submission에 등록된 ref를 무시하고 현재의 값이 할당된다.
 * @param {Object} compObj [Default : null] 전송중 disable시킬 컴포넌트
 * @author InswaveSystems
 * @example 
// Submission의 ref 속성에 서버에 전송할 DataCollection을 설정하는 경우
com.sbm.execute(sbm_search); 

//  Submission의 ref 속성에 서버에 전송할 DataCollection을 설정하지 않고 JSON 객체를 전송하는 경우
var searchParam = {
	id : "A0001"
};
com.sbm.execute(sbm_search, searchParam); 
 */
com.sbm.execute = function (sbmObj, requestData, compObj) {
	return new Promise(function(resolve, reject) {
		if (typeof sbmObj === "object") {
			var _sbmObj = (typeof sbmObj == 'object') ? sbmObj : (typeof sbmObj == 'string') ? $p.getSubmission(sbmObj) : sbmObj;
	
			if (com.util.isEmpty(_sbmObj.action)) {
				//var alertMsg = com.data.getMessage("MSG_CM_00002", "action");
				//com.win.alert(alertMsg);
				return false;
			}
			
			if (com.util.isEmpty(_sbmObj.submitDoneHandler)) {
				_sbmObj._promise_submitDoneHandler = function(rtn) {
					resolve(rtn);
				}
			}
			
			if (com.util.isEmpty(_sbmObj.submitErrorHandler)) {
				_sbmObj._promise_submitErrorHandler = function(rtn) {
					reject(rtn);
				}
			}
			
			$p.executeSubmission(_sbmObj, requestData, compObj);
		}
	});
};


com.util = {};

/**
 * 값이 Empty 상태(undefined, null, "")인지 판별한다.
 * @memberOf com.util
 * @date 2020.05.16
 * @param value Empty 여부를 판단할 값
 * @return Empty 여부 (true : Empty, false : Not Empty)
 * @example
if (com.util.isEmpty(empCd) === false) {
	console.log("empCd : " + empCd);
}
 */
com.util.isEmpty = function(value) {
	if ((typeof value === "undefined") || (value === null) || (value === "")) {
		return true;
	} else {
		return false;
	}
};