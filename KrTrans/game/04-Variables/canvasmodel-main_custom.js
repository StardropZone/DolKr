// z-index 변경 - 오른팔

Renderer.CanvasModels["main"].layers["rightarm"].zfn = function(options) {
    return (options.arm_right === "cover" || options.arm_right === "hold") ? ZIndices.arms_cover : ZIndices.arms_cover;
};

// z-index 변경 - 오른팔 소매

Renderer.CanvasModels["main"].layers["upper_rightarm"].zfn = function(options) {
return ZIndices.hands + 0.1;
};

// z-index 변경 - 오른팔 소매악세

Renderer.CanvasModels["main"].layers["upper_rightarm_acc"].zfn = function(options) {
return ZIndices.hands + 0.1;
};

// z-index 변경 - 오른팔 속옷

Renderer.CanvasModels["main"].layers["under_upper_rightarm"].zfn = function(options) {
return options.arm_right === "cover" || options.arm_right === "hold" ? ZIndices.under_upper_arms_cover : ZIndices.under_upper_arms_cover;
};

// z-index 변경 - 오른팔 장갑

Renderer.CanvasModels["main"].layers["hands_right"].zfn = function(options) {
return (options.arm_right === "cover" || options.arm_right === "hold") ? ZIndices.hands : ZIndices.hands;
};

// z-index 변경 - 오른팔 장갑악세

Renderer.CanvasModels["main"].layers["hands_right_acc"].zfn = function(options) {
return (options.arm_right === "cover" || options.arm_right === "hold") ? ZIndices.hands : ZIndices.hands;
};

// z-index 변경 - 왼팔 소매

Renderer.CanvasModels["main"].layers["upper_leftarm"].zfn = function(options) {
return options.zarms + 2;
};

// z-index 변경 - 왼팔 소매_2

Renderer.CanvasModels["main"].layers["upper_leftarm_fitted"].zfn = function(options) {
return options.zarms + 1;
};

// z-index 변경 - 왼팔 소매악세

Renderer.CanvasModels["main"].layers["upper_leftarm_acc"].zfn = function(options) {
return options.zarms + 2;
};

// z-index 변경 - 왼팔 소매악세_2

Renderer.CanvasModels["main"].layers["upper_leftarm_fitted_acc"].zfn = function(options) {
return options.zarms + 1;
};

// z-index 변경 - 고양이 귀

Renderer.CanvasModels["main"].layers["cat_ears"].z = ZIndices.fronthair + 0.1;