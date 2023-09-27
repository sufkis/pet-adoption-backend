const S = require('fluent-json-schema').default;

const userInfoSignUpVS = S.object()
    .prop(
        'email',
        S.string().minLength(1).required()
    )
    .prop(
        'password',
        S.string().minLength(1).required()
    )
    .prop(
        'firstName',
        S.string().minLength(1).required()
    )
    .prop(
        'lastName',
        S.string().minLength(1).required()
    )
    .prop(
        'phone',
        S.string().minLength(1).required()
    )
    .valueOf();
exports.userInfoSignUpVS = userInfoSignUpVS;

const userInfoUpdateVS = S.object()
    .prop(
        'email',
        S.string().minLength(1).required()
    )
    .prop(
        'firstName',
        S.string().minLength(1).required()
    )
    .prop(
        'lastName',
        S.string().minLength(1).required()
    )
    .prop(
        'phone',
        S.string().minLength(1).required()
    )
    .prop(
        'bio',
        S.string()
    )
    .valueOf();
exports.userInfoUpdateVS = userInfoUpdateVS;

const loginReqVS = S.object()
    .prop(
        'email',
        S.string().minLength(1).required()
    )
    .prop(
        'password',
        S.string().minLength(1).required()
    )
    .valueOf();
exports.loginReqVS = loginReqVS;

const passwordChangeVS = S.object()
    .prop(
        'currentPassword',
        S.string().minLength(1).required()
    )
    .prop(
        'newPassword',
        S.string().minLength(1).required()
    )
    .valueOf();
exports.passwordChangeVS = passwordChangeVS;

const petInfoUpdateVS = S.object()
    .prop(
        'name',
        S.string().minLength(1).required()
    )
    .prop(
        'status',
        S.string().minLength(1).required()
    )
    .prop(
        'height',
        S.number().minimum(1).required()
    )
    .prop(
        'weight',
        S.number().minimum(1).required()
    )
    .prop(
        'color',
        S.string().minLength(1).required()
    )
    .prop(
        'hypoallergenic',
        S.boolean().required()
    )
    .prop(
        'type',
        S.string().required()
    )
    .prop(
        'breed',
        S.string().required()
    )
    .prop(
        'bio',
        S.string().required()
    )
    .prop(
        'diet',
        S.string().required()
    )
    .prop(
        'image',
        S.string()
    )
    .valueOf();
exports.petInfoUpdateVS = petInfoUpdateVS;

const statusUpdateVS = S.object()
    .prop(
        'status',
        S.string().minLength(1).required()
    )
    .valueOf();
exports.statusUpdateVS = statusUpdateVS;
