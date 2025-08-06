const Game = require('../models/Game');

exports.saveGame = async (req, res) => {
  try {
    const { board, solution, difficulty } = req.body;
    const game = await Game.create({
      userId: req.user.id,
      board,
      solution,
      difficulty,
    });
    res.status(201).json({
      success: true,
      data: game,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

exports.loadGame = async (req, res) => {
  try {
    const game = await Game.findOne({ userId: req.user.id });
    if (!game) {
      return res.status(404).json({
        success: false,
        error: 'No game found',
      });
    }
    res.status(200).json({
      success: true,
      data: game,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};
