/**
 * Created by huxinxin on 2016/9/28.
 * 试卷模块
 */
angular.module("app.paper",["ng","app.subject"])
    //试卷查询控制器
    .controller("paperListController",["$scope",function($scope){

    }])
    //试卷添加控制器
    .controller("paperAddController",["$scope","$routeParams",
        "paperModel","commonService","paperService",
        function($scope,$routeParams,paperModel,commonService,paperService){
                //双向绑定的模板
                $scope.pmodel=paperModel.model;
                $scope.savePaper=function(){
                    paperService.savePaper($scope.pmodel,function(data){
                        alert(data);
                    })
                }
                commonService.getAllDepartmentes(function(data){
                    //将全部方向绑定到作用域的depart
                    $scope.depart=data;
                })
                var subjectId=$routeParams.id;
                if(subjectId!=0){
                    //将要添加的题目的Id添加到数组中
                    paperModel.addsubjectIds(subjectId);
                    paperModel.addsubjects(angular.copy($routeParams));
                }

    }])
    //试卷删除控制器
    .controller("paperDelController",["$scope",function($scope){

    }])
    .factory("paperService",["$http","$httpParamSerializer",function($http,$httpParamSerializer){
            return {
                savePaper:function(param,handler) {
                    var obj={};
                    for(var key in param){
                        var val=param[key];
                        switch(key){
                            case 'papername':obj['paper.title']=val;
                                break;
                            case 'description':obj['paper.description']=val;
                                break;
                            case 'departmentId':obj['paper.department.id	']=val;
                                break;
                            case 'answertime':obj['paper.answerQuestionTime']=val;
                                break;
                            case 'total':obj['paper.totalPoints']=val;
                                break;
                            case 'scores':obj['scores']=val;
                                break;
                            case 'subjectIds':obj['subjectIds ']=val;
                                break;
                        }
                    }
                    obj = $httpParamSerializer(obj);
                    $http.post("http://172.16.0.5:7777/test/exam/manager/saveExamPaper.action",
                        obj, {
                            headers: {"Content-Type": "application/x-www-form-urlencoded"}
                        }).success(function (data) {
                        handler(data);
                    })
                }
            }
    }])
    .factory("paperModel",["$http",function($http){
        return {
                 //模板 单例
                model:{
                    papername:"",       //试卷名称
                    description:"",     //试卷描述
                    departmentId:1,    //方向Id
                    answertime:0,      //答题时间
                    total:0,            //总分
                    scores:[],           //每个题目的分值
                    subjectIds:[],       //每个题目的Id
                    subjects:[]
                },
            addsubjectIds:function(id){
                    this.model.subjectIds.push(id);
            },
            addsubjects:function(subject){
                this.model.subjects.push(subject);
            }
        }
    }])

