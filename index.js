const { Notification } = require('electron');

module.exports = {
    defaultConfig: {
        enabled: true,
        cairos: true,
        scenario: true,
        raid: true,
        rift: true,
        toa: true,
    },
    defaultConfigDetails: {
        cairos: { label: 'Cairos Dungeon' },
        scenario: { label: 'Scenario' },
        raid: { label: 'Rift of World' },
        rift: { label: 'Elemental Beasts' },
        toa: { label: 'Trial of Ascension' },
    },
    pluginName: 'RunNotifier',
    pluginDescription: 'Receive a notification when run has finished.',
    init (proxy, config) {
        const pluginConfig = config.Config.Plugins[this.pluginName];

        if (! pluginConfig.enabled) {
            return;
        }

        this.events(pluginConfig).forEach(event => {
            proxy.on(event, (request, response) => {
                const notification = new Notification({
                    title: 'Summoners War',
                    body: 'The run has finished.',
                });

                notification.show();
            });
        });
    },
    events (config) {
        return [
            config.cairos ? 'BattleDungeonResult' : null,
            config.scenario ? 'BattleScenarioResult' : null,
            config.raid ? 'BattleRiftOfWorldsRaidResult' : null,
            config.rift ? 'BattleRiftDungeonResult' : null,
            config.toa ? 'BattleTrialTowerResult_v2' : null,
        ].filter(element => element != null);
    },
};
