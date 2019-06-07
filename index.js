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
    pluginDescription: 'Receive a notification when a run has finished.',
    init (proxy, config) {
        const pluginConfig = config.Config.Plugins[this.pluginName];

        Object.entries(this.events())
            .forEach(([mode, event]) => {
                proxy.on(event, (request, response) => {
                    if (! pluginConfig.enabled || ! pluginConfig[mode]) {
                        return;
                    }

                    const notification = new Notification({
                        title: 'Summoners War',
                        body: 'The run has finished.',
                    });

                    notification.show();
                });
            });
    },
    events () {
        return {
            'cairos': 'BattleDungeonResult',
            'scenario': 'BattleScenarioResult',
            'raid': 'BattleRiftOfWorldsRaidResult',
            'rift': 'BattleRiftDungeonResult',
            'toa': 'BattleTrialTowerResult_v2',
        };
    },
};
