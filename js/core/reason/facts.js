// Kho lưu các fact trong quá trình suy luận

export function createFacts() {

    return {
        facts: [],
        strengths: [],
        jobs: [],
        suggestions: []
    };

}

export function hasFact(store, id) {

    return store.some(item => item.id === id);

}

export function addFact(store, fact) {

    if (!fact) return false;

    const old = store.find(item => item.id === fact.id);

    if (old) {

        old.score += fact.score ?? 1;
        return false;

    }

    store.push({
        id: fact.id,
        text: fact.text,
        score: fact.score ?? 1
    });

    return true;

}