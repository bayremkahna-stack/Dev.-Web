export class DataBindingDemoComponent {
  title: string = 'Data Binding Demo';
  userInput: string = '';

  updateUserInput(value: string): void {
    this.userInput = value;
  }
}