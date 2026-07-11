const learners = {};

export function registerLearner(type, learner) {
    learners[type] = learner;
}

export function getLearner(type) {
    return learners[type] || null;
}

export async function learn(type, source) {

    const learner = getLearner(type);

    if (!learner) {
        throw new Error(`Learner "${type}" chưa được đăng ký.`);
    }

    return await learner.learn(source);

}