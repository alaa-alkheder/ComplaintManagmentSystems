
module.exports.successMassage = function (res,code,massage) {
return   res.status(200).send({"ststus":code,"massage":massage});
};