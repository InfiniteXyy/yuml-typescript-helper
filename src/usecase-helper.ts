class UsecaseDiagram {
  private actorList: Actor[] = [];
  private useCaseList: UseCase[] = [];

  constructor() {}

  actor(name: string) {
    const actor = new Actor(name);
    this.actorList.push(actor);
    return actor;
  }

  usecase(title: string) {
    const usecase = new UseCase(title);
    this.useCaseList.push(usecase);
    return usecase;
  }

  generate() {
    const result: string[] = [];
    result.push(...this.useCaseList.map(i => i.generate()));
    result.push(...this.actorList.map(i => i.generate()));
    return result.join("\n");
  }
}

class Actor {
  private father?: Actor;
  private links: UseCase[];
  public name: string;
  constructor(name: string) {
    this.links = [];
    this.father = null;
    this.name = `[${name}]`;
  }

  inherit(father: Actor) {
    this.father = father;
    return this;
  }

  ineritedBy(...son: Actor[]) {
    son.forEach(i => i.inherit(this));
    return this;
  }

  link(...useCase: UseCase[]) {
    this.links.push(...useCase);
    return this;
  }

  generate() {
    const result: string[] = [];
    result.push(this.name);
    if (!!this.father) result.push(`${this.father.name}^${this.name}`);
    result.push(...this.links.map(link => `${this.name}-${link.title}`));
    return result.join("\n");
  }
}

class UseCase {
  private extendList: UseCase[] = [];
  private includeList: UseCase[] = [];
  public title: string;

  constructor(title: string) {
    this.title = `(${title})`;
  }

  extend(...parent: UseCase[]) {
    this.extendList.push(...parent);
    return this;
  }

  extendedBy(...son: UseCase[]) {
    son.forEach(i => i.extend(this));
    return this;
  }

  include(...son: UseCase[]) {
    this.includeList.push(...son);
    return this;
  }

  includedBy(...father: UseCase[]) {
    father.forEach(i => i.include(this));
    return this;
  }

  linkedBy(...actor: Actor[]) {
    actor.forEach(i => i.link(this));
    return this;
  }

  generate() {
    const result: string[] = [];
    result.push(this.title);
    result.push(
      ...this.extendList.map(father => `${father.title}<${this.title}`)
    );
    result.push(...this.includeList.map(son => `${this.title}>${son.title}`));
    return result.join("\n");
  }
}

export { UsecaseDiagram };
