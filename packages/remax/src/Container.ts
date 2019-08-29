import VNode, { Path, RawNode } from './VNode';
import { generate } from './instanceId';
import { FiberRoot } from 'react-reconciler';

function stringPath(path: Path) {
  return path.join('.');
}

interface SpliceUpdate {
  path: Path;
  start: number;
  deleteCount: number;
  items: RawNode[];
}

export default class Container {
  context: any;
  root: VNode;
  updateQueue: SpliceUpdate[] = [];
  _rootContainer?: FiberRoot;

  constructor(context: any) {
    this.context = context;

    this.root = new VNode({
      id: generate(),
      type: 'root',
      container: this,
    });
    this.root.mounted = true;
  }

  requestUpdate(
    path: Path,
    start: number,
    deleteCount: number,
    ...items: RawNode[]
  ) {
    const update: SpliceUpdate = {
      path,
      start,
      deleteCount,
      items,
    };
    if (this.updateQueue.length === 0) {
      setTimeout(() => this.applyUpdate());
    }
    this.updateQueue.push(update);
  }

  applyUpdate() {
    const startTime = new Date().getTime();

    this.context.setData({ root: this.root.toJSON() }, () => {
      if (process.env.REMAX_DEBUG) {
        console.log(
          `setData => 回调时间：${new Date().getTime() - startTime}ms`
        );
      }
    });
    this.updateQueue = [];
  }

  createCallback(name: string, fn: Function) {
    this.context[name] = fn;
  }

  appendChild(child: VNode) {
    this.root.appendChild(child);
  }

  removeChild(child: VNode) {
    this.root.removeChild(child);
  }

  insertBefore(child: VNode, beforeChild: VNode) {
    this.root.insertBefore(child, beforeChild);
  }
}
