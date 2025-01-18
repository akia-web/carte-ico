export interface UserDto {
  id: number,
  name: string,
  email: string,
  role: string,
  created_at: Date,
  user_stat: {
    game_played: number,
    num_win: number,
    game_abandoned: number,
    game_loss: number
  }[]
}