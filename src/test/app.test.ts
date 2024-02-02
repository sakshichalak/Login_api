import { expect } from "chai";
import sinon from "sinon"; 
import { loginService } from "../login.service"; 

describe("loginService", () => {
    const LoginService: loginService = new loginService();

    beforeEach(() => {
    });

    describe("generateOtp", () => {
        it("should generate an OTP with the specified number of digits", async () => {
            const otp = await LoginService.generateOtp(4);
            expect(otp).to.match(/^\d{4}$/); 
        });
    });

    describe("saveOtp", () => {
        it("should save OTP to the database", async () => {
            // Use sinon to stub the createdb and executeQuery functions
            const createdbStub = sinon.stub(LoginService, "createdb").resolves({});
            const executeQueryStub = sinon.stub(LoginService, "executeQuery").resolves();

            await LoginService.saveOtp("sakshi.chalak@gmail.com", "1234");
            expect(createdbStub.calledOnce).to.be.true;
            expect(executeQueryStub.calledOnce).to.be.true;
            createdbStub.restore();
            executeQueryStub.restore();
        });
    });

    describe("verifyOtp", () => {
        it("should return true if OTP is valid and not expired", async () => {
            // Stub the createdb and executeQuery functions
            const createdbStub = sinon.stub(LoginService, "createdb").resolves({});
            const executeQueryStub = sinon.stub(LoginService, "executeQuery").resolves([{}]);

            // Mock the current time to be within the validity period
            const clock = sinon.useFakeTimers(new Date().getTime());

            const isOtpValid = await LoginService.verifyOtp("sakshi.chalak@gmail.com", "1234");

            // Assertions
            expect(isOtpValid).to.be.true;
            expect(createdbStub.calledOnce).to.be.true;
            expect(executeQueryStub.calledOnce).to.be.true;

            // Restore stubs and clocks
            createdbStub.restore();
            executeQueryStub.restore();
            clock.restore();
        });

        it("should return false if OTP is invalid or expired", async () => {
            // Stub the createdb and executeQuery functions
            const createdbStub = sinon.stub(LoginService, "createdb").resolves({});
            const executeQueryStub = sinon.stub(LoginService, "executeQuery").resolves([]); // Empty result for an invalid/expired OTP

            // Mock the current time to be outside the validity period
            const clock = sinon.useFakeTimers(new Date().getTime() + 4 * 60 * 60 * 1000); 

            const isOtpValid = await LoginService.verifyOtp("sakshi.chalak@gmail.com", "1234");

            // Assertions
            expect(isOtpValid).to.be.false;
            expect(createdbStub.calledOnce).to.be.true;
            expect(executeQueryStub.calledOnce).to.be.true;

            // Restore stubs and clocks
            createdbStub.restore();
            executeQueryStub.restore();
            clock.restore();
        });

    });

    describe("Registration", () => {
        it("should register a new user successfully", async () => {
            // Stub the isExists, createdb, and executeQuery functions
            const isExistsStub = sinon.stub( LoginService, "isExists").resolves(false); // User does not exist
            const createdbStub = sinon.stub(LoginService, "createdb").resolves({});
            const executeQueryStub = sinon.stub(LoginService, "executeQuery").resolves();

            // Stub hashPassword to return a hashed password
            const hashPasswordStub = sinon.stub(LoginService, "hashPassword").resolves("hashed-password");

            // Call the Registration function
            const newUser = {
                firstName: "sakshi",
                lastName: "chalak",
                email: "sakshi.chalak@gmail.com",
                password: "sakshi123",
            };
            const registrationResult = await LoginService.Registration(newUser);

            // Assertions
            expect(registrationResult).to.be.true;
            expect(isExistsStub.calledOnceWith(newUser.email)).to.be.true;
            expect(createdbStub.calledOnce).to.be.true;
            expect(hashPasswordStub.calledOnceWith(newUser.password)).to.be.true;
            expect(executeQueryStub.calledOnce).to.be.true;

            // Restore stubs
            isExistsStub.restore();
            createdbStub.restore();
            hashPasswordStub.restore();
            executeQueryStub.restore();
        });
    });

    describe("login", () => {
        it("should return true if user login is successful", async () => {
            // Stub the createdb, executeQuery, hashPassword, and comparePassword functions
            const createdbStub = sinon.stub(loginService, "createdb").resolves({});
            const executeQueryStub = sinon.stub(loginService, "executeQuery").resolves([{ password: "hashed-password" }]);
            const hashPasswordStub = sinon.stub(loginService, "hashPassword").resolves("hashed-password");
            const comparePasswordStub = sinon.stub(loginService, "comparePassword").resolves(true);

            // Call the login function
            const loginResult = await loginService.login("sakshi.chalak@gmail.com", "sakshi123");

            // Assertions
            expect(loginResult).to.be.true;
            expect(createdbStub.calledOnce).to.be.true;
            expect(executeQueryStub.calledOnce).to.be.true;
            expect(hashPasswordStub.calledOnce).to.be.true;
            expect(comparePasswordStub.calledOnce).to.be.true;

            // Restore stubs
            createdbStub.restore();
            executeQueryStub.restore();
            hashPasswordStub.restore();
            comparePasswordStub.restore();
        });
    });
});