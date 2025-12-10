export class UserProfileComponent {
  userName: string = '';

  updateUserName(newName: string): void {
    this.userName = newName;
  }
}