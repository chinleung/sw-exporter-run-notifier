const { Notification } = require('electron');
const versionChecker = require('sw-exporter-plugin-version-checker');

module.exports = {
    defaultConfig: {
        enabled: true,
        cairos: true,
        scenario: true,
        raid: true,
        rift: true,
        toa: true,
        dimension: true,
    },
    defaultConfigDetails: {
        cairos: { label: 'Cairos Dungeon' },
        scenario: { label: 'Scenario' },
        raid: { label: 'Rift of World' },
        rift: { label: 'Elemental Beasts' },
        toa: { label: 'Trial of Ascension' },
        dimension: { label: 'Dimension Hole' },
    },
    pluginName: 'RunNotifier',
    pluginDescription: 'Receive a notification when a run has finished.',
    init (proxy, config) {
        const pluginConfig = config.Config.Plugins[this.pluginName];

        if (pluginConfig.enabled) {
            versionChecker.proceed({
                name: this.pluginName,
                config: require('./package.json'),
                proxy: proxy
            });
        }

        Object.entries(this.events())
            .forEach(([mode, event]) => {
                proxy.on(event, (request, response) => {
                    if (! pluginConfig.enabled || ! pluginConfig[mode]) {
                        return;
                    }

                    const notification = new Notification({
                        title: 'Summoners War',
                        body: response.win_lose == 1
                            ? 'The run has finished.'
                            : 'The run has failed.',
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
            'dimension': 'BattleDimensionHoleDungeonResult',
        };
    },
};
