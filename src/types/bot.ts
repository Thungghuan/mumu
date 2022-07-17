export interface BotConfig {
  qq: number
  masterQQ: number
  settingFile: string
}

export interface BotSetting {
  verifyKey: string
  adapterSettings: {
    http: {
      host: string
      port?: number
    }
  }
}
