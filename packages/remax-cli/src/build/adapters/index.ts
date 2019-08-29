export interface Adapter {
  name: string;

  extensions: {
    template: string;
    style: string;
  };

  templates: {
    base: string;
    component: string;
    page: string;
  };

  hostComponents: (component: string) => { props: string[] };

  getNativePropName: (key: string) => string;

  getIcons: (config: any) => string[];

  moduleFormat: 'cjs' | 'esm';
}

export default ['alipay', 'wechat', 'h5'];
