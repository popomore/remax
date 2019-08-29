import * as path from 'path';

export const name = 'alipay';

export function hostComponents(component: string) {
  return require(`./hostComponents/${component}`);
}

export const extensions = {
  template: '.axml',
  style: '.acss',
};

const templateBaseDir = path.join(__dirname, '../../../../templates');

export const templates = {
  base: path.join(templateBaseDir, 'alipay/base.ejs'),
  component: path.join(templateBaseDir, 'alipay/component.ejs'),
  page: path.join(templateBaseDir, 'alipay/page.ejs'),
};

export const moduleFormat = 'esm';

// TODO: remax 和 remax-cli 重复定义了，要 DRY
const alias: any = {
  className: 'class',
  onClick: 'onTap',
};

export function getNativePropName(prop: string) {
  const aliasProp = alias[prop];

  if (aliasProp) {
    return aliasProp;
  }

  return prop;
}

export function getIcons(config: any) {
  if (!config.tabBar) {
    return [];
  }

  const tabs: { icon: string; activeIcon: string }[] = config.tabBar.items;

  if (tabs) {
    return tabs.reduce<string[]>(
      (images, tab) => [...images, tab.icon, tab.activeIcon],
      []
    );
  }

  return [];
}
