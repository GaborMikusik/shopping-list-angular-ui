import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ListManagementComponent } from "./list-management.component";
import { AccountService } from "./service/account.service";
import { NavigationButtonService } from "./service/navigation-button.service";
import { ErrorService } from "./errors/error.service";
import { BehaviorSubject, of } from "rxjs";
import { MaterialExampleModule } from "./material.module";
import { Router } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { User } from "./model/user";
import { By } from "@angular/platform-browser";

describe('AppComponent', () => {
    let component: ListManagementComponent;
    let fixture: ComponentFixture<ListManagementComponent>;
    // Declare shared variable
    let fakeAccountService: AccountService;
    let showListManagementSubject: BehaviorSubject<User | null>;
    let mockRouter: jasmine.SpyObj<Router>;
    let mockNavigationService: jasmine.SpyObj<NavigationButtonService>

    beforeEach(async () => {
        const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
        const navigationServiceSpy = jasmine.createSpyObj('NavigationButtonService', ['emitButtonClick'])

        showListManagementSubject = new BehaviorSubject<User | null>({
            username: 'testusername',
            email: 'test@email.com',
            password: 'testpassword',
            token: 'test-access-token',
        });

        const fakeAccountService: jasmine.SpyObj<AccountService> = jasmine.createSpyObj('AccountService', {
            userValue: of({
                username: 'testusername',
                email: 'test@email.com',
                password: 'testpassword',
                token: 'test-access-token',
            }),
        });

        Object.defineProperty(fakeAccountService, 'getShowListManagement$', {
            get: () => showListManagementSubject.asObservable(),
        });

        await TestBed.configureTestingModule({
            declarations: [ListManagementComponent],
            imports: [MaterialExampleModule, AppRoutingModule],
            providers: [
                { provide: AccountService, useValue: fakeAccountService },
                { provide: Router, useValue: routerSpy },
                { provide: NavigationButtonService, useValue: navigationServiceSpy },
                // { provide: ErrorService, useValue: fakeErrorService },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ListManagementComponent);
        component = fixture.componentInstance;
        mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
        mockNavigationService = TestBed.inject(NavigationButtonService) as jasmine.SpyObj<NavigationButtonService>;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate to signin page when user is null', () => {
        showListManagementSubject.next(null);

        fixture.detectChanges();

        expect(mockRouter.navigate).toHaveBeenCalledWith(['/account/signin']);
    });

    it('should navigate to root when user is not null', () => {
        fixture.detectChanges();

        expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should emit "actualLists" when click on "lists" button', () => {
        const listsButton = fixture.debugElement.query(By.css('[data-testid="actual-list-button"]'));

        expect(listsButton).toBeTruthy();

        listsButton.triggerEventHandler('click', null);

        fixture.detectChanges();

        expect(mockNavigationService.emitButtonClick).toHaveBeenCalledWith('actualLists');
    });

    it('should emit "history" when click on "history" button', () => {
        const historyButton = fixture.debugElement.query(By.css('[data-testid="history-button"]'));

        expect(historyButton).toBeTruthy();

        historyButton.triggerEventHandler('click', null);

        fixture.detectChanges();

        expect(mockNavigationService.emitButtonClick).toHaveBeenCalledWith('history');
    });

    it('should emit "newList" when click on "add" button', () => {
        const addButton = fixture.debugElement.query(By.css('[data-testid="new-list-button"]'));

        expect(addButton).toBeTruthy();

        addButton.triggerEventHandler('click', null);

        fixture.detectChanges();

        expect(mockNavigationService.emitButtonClick).toHaveBeenCalledWith('newList');
    });

    // it('should call logout function in account service when click on "logout" button', () => {
    //     const logoutButton = fixture.debugElement.query(By.css('[data-testid="logout-button"]'));

    //     logoutButton.triggerEventHandler('click', null);

    //     fixture.detectChanges;

    //     expect(fakeAccountService.logout).toHaveBeenCalled();
    // })
});
