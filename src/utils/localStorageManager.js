function getAllExperiments() {
    if (localStorage.hasOwnProperty("experiments")) {
        return JSON.parse(localStorage.getItem('experiments'))
    } else {
        localStorage.setItem('experiments', JSON.stringify([]))
        return []
    }
}

function isHaveAnyExperiment() {
    return localStorage.hasOwnProperty("experiments")
}

function addNewExperiment(experiment) {
    let experiments = getAllExperiments()
    experiments.push(experiment)
    localStorage.setItem('experiments', JSON.stringify(experiments))
}

function deleteExistingExperiment(experiment) {
    let experiments = getAllExperiments()
    const index = experiments.findIndex(item => item.UUID === experiment.UUID);
    if (index !== -1) {
        experiments.splice(index, 1);
    }
    localStorage.setItem('experiments', JSON.stringify(experiments))
}


function addANewHistory(experimentHistory) {
    let history = []
    if (localStorage.hasOwnProperty("experimentHistory")) {
        history = getAllHistory()
    }
    history.push(experimentHistory)
    localStorage.setItem('experimentHistory', JSON.stringify(history))
}

function getAllHistory() {
    let history = []
    if (localStorage.hasOwnProperty("experimentHistory")) {
        history = JSON.parse(localStorage.getItem('experimentHistory'))
    }
    return history
}

function deleteExistingHistory(history) {
    let allHistory = getAllHistory()
    const index = allHistory.findIndex(item => item.UUID === history.UUID);
    if (index !== -1) {
        allHistory.splice(index, 1);
    }
    localStorage.setItem('experimentHistory', JSON.stringify(allHistory))
}

export {
    getAllExperiments, isHaveAnyExperiment,
    addNewExperiment, deleteExistingExperiment,
    addANewHistory, getAllHistory, deleteExistingHistory
}