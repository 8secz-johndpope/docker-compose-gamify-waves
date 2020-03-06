const { getDateNow, generateUuid } = require("../helper");
const { getActionById } = require("../service/actionsService");

const {
  isDuplicate,
  saveActionHistory
} = require("../service/actionHistoryService");

exports.getCrewLeaderboard = async () => {
  try {
    const leaderboard = await global.conn.query(
      "select * from crew_leaderboard"
    );
    return leaderboard;
  } catch (error) {
    throw error;
  }
};

exports.createLeaderboardEntry = async crewId => {
  try {
    const timestamp = getDateNow();
    const leaderboard = await global.conn.query(
      "INSERT INTO crew_leaderboard value (?,?,?,?,?)",
      [generateUuid(), crewId, 0, timestamp, timestamp]
    );
    return leaderboard;
  } catch (error) {
    throw error;
  }
};

exports.incrementLeaderBoardEntryByCrewId = async (crewId, score) => {
  try {
    const leaderboard = await global.conn.query(
      `UPDATE crew_leaderboard SET score=score + ?, 
      updated_at=? WHERE crew_id='${crewId}'`,
      [score, getDateNow()]
    );
    return leaderboard;
  } catch (error) {
    throw error;
  }
};

exports.handleAction = async (category, crewId, sourceId) => {
  try {
    if (!(await isDuplicate(crewId, sourceId, category))) {
      await saveActionHistory(crewId, crewId, sourceId, category);
      const action = await getActionById(category);
      if (action.length > 0) {

        await this.incrementLeaderBoardEntryByCrewId(crewId, action[0].points);
        return true;
      } else {
        return false;
      }
    }else{
      return false;
    }
  } catch (error) {
    throw error;
  }
};
