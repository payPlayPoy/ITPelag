interface Logger {
  log(message: string): void;
}

interface Settings {
  getSetting(key: string, defaultValue: string): Record<string, string>;
}

class CustomLogger implements Logger {
  log(message: string): void {
    console.log(message);
  }
}

class GlobalSettings implements Settings {
  private settings: Record<string, string> = {
    "use-yearmonth-folders": "2",
    "wp-uploads": "1",
    "copy-to-s3": "2",
    "serve-from-s3": "3",
    "object-prefix": "4",
    "object-versioning": "1212",
  };

  public getSetting(key: string, defaultValue: string = ""): Record<string, string> {
    return { [key]: this.settings[key] || defaultValue };
  }
}

class SettingsRepository {
  private logger: Logger;
  private globalSettings: Settings;

  constructor(logger: Logger, globalSettings: Settings) {
    this.logger = logger;
    this.globalSettings = globalSettings;
  }

  private getDefaultValue(key: string): string {
    switch (key) {
      case "key1":
        return "6";
      case "key2":
        return "5";
      case "uploadsuseyearmonthfolders":
        return "10";
      default:
        return "default";
    }

  }

  private isLegacySettingSet(key: string): boolean {
    return (
      this.globalSettings.getSetting("wp-uploads", "") &&
      ["copy-to-s3", "serve-from-s3"].includes(key)
    );
  }

  private isObjectVersioningOn(key: string): boolean {
    return key === "object-versioning" && !this.globalSettings.getSetting(key, "");
  }

  private isObjectPrefixDefault(key: string): boolean {
    return key === "object-prefix" && !this.globalSettings.getSetting(key, "");
  }

  private getOption(key: string): string {
    return this.getDefaultValue(key);
  }

  public getSetting(key: string, defaultValue: string = ""): string {
    let result: string = defaultValue;

    if (this.isLegacySettingSet(key)) {
      this.logger.log("Legacy setting detected");
    } else if (this.isObjectVersioningOn(key)) {
      result = defaultValue;
    } else if (this.isObjectPrefixDefault(key)) {
      result = this.getDefaultObjectPrefix();
    } else {
      const value = this.globalSettings.getSetting(key, defaultValue);
      result = value[key] || defaultValue;
    }

    this.logger.log(result);
    return result;
  }

  private getDefaultObjectPrefix(): string {
    return "getdefaultobjectprefix";
  }
}



