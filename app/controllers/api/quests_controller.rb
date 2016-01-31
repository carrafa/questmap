class Api::QuestsController < ApplicationController

  def index
    dbQuests = Quest.all
    render json: {quests: dbQuests}
  end

  def create
    new_quest = Quest.create(quest_params)
    render json: new_quest
  end

  def update
    quest = Quest.find(params[:id])
    quest.update(quest_params)
    render json: quest
  end
  private

  def quest_params
    params.require(:quest).permit(:lat, :lon, :name, :quest, :fav_color, :swords)
  end

end
